import { Link } from 'react-router-dom';

export default function Politica() {
  return (
    <main>
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-[#030305]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <span className="reveal inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">LGPD</span>
          <h1 className="reveal reveal-delay-1 mt-4 font-['Playfair_Display'] text-4xl font-bold text-white sm:text-5xl">
            Política de{' '}
            <span className="text-gradient-gold">Privacidade</span>
          </h1>
          <p className="reveal reveal-delay-2 mt-4 text-sm text-[rgba(248,248,250,0.4)]">
            Última atualização: 15 de maio de 2025
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="reveal space-y-8 text-sm leading-relaxed text-[rgba(248,248,250,0.65)]">
            <div>
              <h2 className="font-['Playfair_Display'] mb-3 text-xl font-semibold text-white">1. Introdução</h2>
              <p>
                A Rei das Vendas ("nós", "nosso" ou "empresa") está comprometida com a proteção da sua privacidade. 
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações 
                pessoais em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).
              </p>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] mb-3 text-xl font-semibold text-white">2. Dados que Coletamos</h2>
              <p className="mb-2">Podemos coletar as seguintes informações pessoais:</p>
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de WhatsApp/telefone</li>
                <li>Mensagens e comunicações enviadas através do nosso site</li>
                <li>Dados de navegação (cookies, endereço IP, páginas visitadas)</li>
              </ul>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] mb-3 text-xl font-semibold text-white">3. Como Usamos seus Dados</h2>
              <p className="mb-2">Utilizamos seus dados para:</p>
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>Responder a solicitações de contato e orçamentos</li>
                <li>Prestar serviços contratados</li>
                <li>Enviar comunicações relacionadas aos nossos serviços</li>
                <li>Melhorar nossa plataforma e experiência do usuário</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] mb-3 text-xl font-semibold text-white">4. Compartilhamento de Dados</h2>
              <p>
                Não vendemos, trocamos ou compartilhamos suas informações pessoais com terceiros, 
                exceto quando necessário para a prestação dos serviços (como processamento de pagamentos) 
                ou quando exigido por lei.
              </p>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] mb-3 text-xl font-semibold text-white">5. Cookies</h2>
              <p>
                Utilizamos cookies essenciais para o funcionamento do site. Você pode gerenciar as preferências 
                de cookies através das configurações do seu navegador. Para mais informações, consulte nossa 
                política de cookies.
              </p>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] mb-3 text-xl font-semibold text-white">6. Seus Direitos (LGPD)</h2>
              <p className="mb-2">Você tem direito a:</p>
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>Confirmar a existência de tratamento de seus dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
                <li>Solicitar a portabilidade dos dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] mb-3 text-xl font-semibold text-white">7. Segurança dos Dados</h2>
              <p>
                Adotamos medidas técnicas e organizacionais para proteger suas informações pessoais 
                contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] mb-3 text-xl font-semibold text-white">8. Retenção dos Dados</h2>
              <p>
                Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas 
                nesta política, a menos que um período de retenção maior seja exigido por lei.
              </p>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] mb-3 text-xl font-semibold text-white">9. Contato do Encarregado (DPO)</h2>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato 
                com nosso Encarregado de Proteção de Dados:
              </p>
              <p className="mt-2">
                <strong className="text-white">E-mail:</strong> privacidade@reidasvendas.com.br<br />
                <strong className="text-white">WhatsApp:</strong> (11) 99999-9999
              </p>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] mb-3 text-xl font-semibold text-white">10. Alterações nesta Política</h2>
              <p>
                Reservamo-nos o direito de atualizar esta política periodicamente. Notificaremos sobre 
                alterações significativas através do nosso site ou por e-mail.
              </p>
            </div>
          </div>

          <div className="reveal mt-10">
            <Link to="/" className="btn-outline">Voltar para Home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
