import { flushSync } from 'react-dom';
import { Link, useNavigate, type LinkProps } from 'react-router-dom';

/**
 * <Link> com View Transitions API nativa.
 *
 * O prop `viewTransition` do React Router 7 só é interpretado pelo Data
 * Router (createBrowserRouter/RouterProvider) — este app usa <BrowserRouter>
 * clássico, onde o prop é aceito mas nunca chama document.startViewTransition.
 * Em vez de migrar toda a árvore de rotas para o Data Router (risco alto para
 * 25+ rotas com redirects e lazy loading), este componente intercepta o
 * clique e dispara a transição manualmente, preservando o comportamento
 * nativo do <Link> (href real, novas abas via cmd/ctrl/meio-clique, teclado).
 *
 * Sem suporte no navegador (ou prefers-reduced-motion, tratado via CSS em
 * index.css), cai automaticamente na navegação normal do React Router.
 */
export function TransitionLink({ onClick, ...props }: LinkProps) {
  const navigate = useNavigate();

  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (props.target && props.target !== '_self') return;
        if (typeof document === 'undefined' || !('startViewTransition' in document)) return;

        event.preventDefault();
        document.startViewTransition(() => {
          flushSync(() => {
            navigate(props.to, { replace: props.replace, state: props.state });
          });
        });
      }}
    />
  );
}
