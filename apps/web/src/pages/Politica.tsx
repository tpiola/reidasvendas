import { Link } from 'react-router-dom';
import { Reveal } from '@/hooks/useAnimation';
import { Shield, Cookie, FileText, Mail, ArrowRight } from 'lucide-react';
import { PremiumButton } from '@/components/PremiumButton';
import { BRAND } from '@/lib/brand';

export default function Politica() {
  return (
    <main>
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <span className="section-label">Privacidade</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl">
              Política de <span className="text-gradient-gold">Privacidade</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-center text-base text-[#A1A1AA]">
              Transparência e segurança no tratamento dos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="space-y-6 text-sm leading-relaxed text-[#A1A1AA]">
              <p><strong className="text-white">Última atualização:</strong> Junho de 2026</p>

              {/* 1 */}
              <h2 className="font-serif text-xl font-bold text-white mt-8"><Shield className="mr-2 inline h-4 w-4 text-[#D6A84F]" />1. Informações que coletamos</h2>
              <p>Coletamos informações fornecidas voluntariamente por você ao preencher formulários em nosso site, como nome, e-mail, telefone, empresa e mensagem. Também coletamos dados de navegação através de cookies e ferramentas de análise, conforme detalhado na seção de cookies abaixo.</p>
              <p><strong className="text-white">Dados pessoais tratados:</strong> nome completo, endereço de e-mail, número de telefone/WhatsApp, nome da empresa, informações de navegação (endereço IP, tipo de navegador, páginas visitadas) e preferências de cookies.</p>

              {/* 2 */}
              <h2 className="font-serif text-xl font-bold text-white mt-8"><FileText className="mr-2 inline h-4 w-4 text-[#D6A84F]" />2. Base legal e finalidades do tratamento</h2>
              <p>Tratamos seus dados pessoais com base nas seguintes hipóteses legais previstas na LGPD:</p>
              <ul className="ml-6 list-disc space-y-1">
                <li><strong className="text-white">Consentimento (Art. 7º, I):</strong> para envio de comunicações de marketing e newsletters, mediante seu consentimento expresso.</li>
                <li><strong className="text-white">Execução de contrato (Art. 7º, V):</strong> para responder a solicitações de contato, propostas e prestação de serviços contratados.</li>
                <li><strong className="text-white">Legítimo interesse (Art. 7º, IX):</strong> para melhoria da plataforma, análise de tráfego e segurança digital.</li>
                <li><strong className="text-white">Cumprimento de obrigação legal (Art. 7º, II):</strong> para atender exigências fiscais, contábeis e regulatórias.</li>
              </ul>

              {/* 3 */}
              <h2 className="font-serif text-xl font-bold text-white mt-8"><Shield className="mr-2 inline h-4 w-4 text-[#D6A84F]" />3. Compartilhamento de dados</h2>
              <p>Não vendemos seus dados pessoais a terceiros. Podemos compartilhar informações com parceiros de tecnologia que nos auxiliam na operação do site e na prestação de serviços (hospedagem, análise de dados, disparo de e-mails), sempre sob contratos de confidencialidade e em conformidade com a LGPD.</p>
              <p><strong className="text-white">Parceiros atuais:</strong> Vercel (hospedagem), Supabase (banco de dados), n8n (automação de processos) e serviços de e-mail transacional.</p>

              {/* 4 */}
              <h2 className="font-serif text-xl font-bold text-white mt-8"><FileText className="mr-2 inline h-4 w-4 text-[#D6A84F]" />4. Seus direitos como titular (LGPD)</h2>
              <p>A LGPD garante a você os seguintes direitos, que podem ser exercidos a qualquer momento:</p>
              <ul className="ml-6 list-disc space-y-1">
                <li><strong className="text-white">Confirmação e acesso (Art. 9º):</strong> saber se tratamos seus dados e acessá-los.</li>
                <li><strong className="text-white">Correção (Art. 18, III):</strong> corrigir dados incompletos, inexatos ou desatualizados.</li>
                <li><strong className="text-white">Exclusão (Art. 18, VI):</strong> solicitar a eliminação dos dados tratados com base no consentimento.</li>
                <li><strong className="text-white">Portabilidade (Art. 18, V):</strong> solicitar a transferência dos dados a outro fornecedor.</li>
                <li><strong className="text-white">Revogação de consentimento (Art. 8º, §5º):</strong> revogar seu consentimento a qualquer momento.</li>
                <li><strong className="text-white">Oposição (Art. 18, §2º):</strong> opor-se ao tratamento com base em legítimo interesse.</li>
              </ul>

              {/* 5 - Cookie Policy */}
              <h2 className="font-serif text-xl font-bold text-white mt-8"><Cookie className="mr-2 inline h-4 w-4 text-[#D6A84F]" />5. Política de Cookies</h2>
              <p>Utilizamos cookies para melhorar sua experiência em nosso site. Cookies são pequenos arquivos de texto armazenados no seu navegador que nos ajudam a entender como você interage com nosso conteúdo.</p>

              <h3 className="font-serif text-lg font-bold text-white mt-6">Tipos de cookies utilizados:</h3>
              <ul className="ml-6 list-disc space-y-1">
                <li><strong className="text-white">Essenciais:</strong> necessários para o funcionamento básico do site. Não podem ser desativados.</li>
                <li><strong className="text-white">Analíticos:</strong> coletam informações anônimas sobre como você usa o site (páginas visitadas, tempo de navegação), permitindo-nos melhorar sua experiência.</li>
                <li><strong className="text-white">Funcionais:</strong> lembram suas preferências (como idioma e região) para personalizar sua navegação.</li>
              </ul>

              <p className="mt-4">Você pode gerenciar suas preferências de cookies a qualquer momento através do banner de cookies exibido em sua primeira visita ou configurando seu navegador para recusar cookies. A desativação de cookies essenciais pode afetar o funcionamento do site.</p>
              <p>Caso tenha aceitado cookies e queira revogar, limpe os cookies do seu navegador ou entre em contato conosco.</p>

              {/* 6 - Terms */}
              <h2 className="font-serif text-xl font-bold text-white mt-8"><FileText className="mr-2 inline h-4 w-4 text-[#D6A84F]" />6. Termos de Serviço</h2>
              <p>Ao utilizar nosso site e serviços, você concorda com os seguintes termos:</p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Os serviços são prestados conforme descrito em nossas páginas de serviços e planos.</li>
                <li>O conteúdo do site (textos, imagens, marcas) é propriedade da Rei das Vendas e não pode ser reproduzido sem autorização.</li>
                <li>Os prazos de entrega e escopo dos projetos são definidos em contrato específico no momento da contratação.</li>
                <li>Não nos responsabilizamos por decisões comerciais tomadas com base em informações disponíveis no blog ou materiais gratuitos.</li>
                <li>Os planos de assinatura têm renovação automática mensal/anual conforme contratado, com cancelamento a qualquer momento mediante aviso prévio de 30 dias.</li>
                <li>O não pagamento das faturas pode resultar na suspensão dos serviços após 15 dias de atraso.</li>
              </ul>

              {/* 7 */}
              <h2 className="font-serif text-xl font-bold text-white mt-8"><Shield className="mr-2 inline h-4 w-4 text-[#D6A84F]" />7. Segurança dos dados</h2>
              <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou destruição, incluindo:</p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Criptografia SSL/TLS em todas as comunicações com nosso site.</li>
                <li>Armazenamento seguro em infraestrutura cloud com controles de acesso rigorosos.</li>
                <li>Política de senhas fortes e autenticação multifator para acesso administrativo.</li>
                <li>Backups regulares e planos de recuperação de desastres.</li>
                <li>Revisões periódicas de segurança e conformidade.</li>
              </ul>

              {/* 8 */}
              <h2 className="font-serif text-xl font-bold text-white mt-8"><Shield className="mr-2 inline h-4 w-4 text-[#D6A84F]" />8. Retenção de dados</h2>
              <p>Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei. Dados de contato são mantidos por até 12 meses após o último contato, salvo solicitação de exclusão. Dados contratuais são mantidos por 5 anos após o término do contrato para cumprimento de obrigações fiscais e legais.</p>

              {/* 9 - DPO */}
              <h2 className="font-serif text-xl font-bold text-white mt-8"><Mail className="mr-2 inline h-4 w-4 text-[#D6A84F]" />9. Contato do Encarregado (DPO)</h2>
              <p>Em conformidade com o Art. 41 da LGPD, nomeamos um Encarregado pelo Tratamento de Dados Pessoais (DPO) para servir como canal de comunicação entre a Rei das Vendas, os titulares dos dados e a Autoridade Nacional de Proteção de Dados (ANPD).</p>
              <div className="mt-4 rounded-xl border border-[rgba(214,168,79,0.15)] bg-[rgba(214,168,79,0.04)] p-4">
                <p className="text-white"><strong>Encarregado (DPO):</strong> [Nome do DPO]</p>
                <p className="text-white mt-1"><strong>E-mail:</strong> <a href={`mailto:dpo@reidasvendas.com.br`} className="text-[#D6A84F]">dpo@reidasvendas.com.br</a></p>
                <p className="text-white mt-1"><strong>Telefone:</strong> (16) [telefone do DPO]</p>
                <p className="text-[#71717A] mt-2 text-xs">Para exercer seus direitos como titular, entre em contato pelo e-mail do DPO ou pelo formulário de contato.</p>
              </div>

              {/* 10 */}
              <h2 className="font-serif text-xl font-bold text-white mt-8">10. Alterações nesta política</h2>
              <p>Esta política pode ser atualizada periodicamente. Recomendamos revisá-la regularmente. Notificaremos alterações significativas através de aviso em nosso site ou por e-mail. O uso continuado do site após alterações constitui aceitação dos novos termos.</p>

              {/* 11 */}
              <h2 className="font-serif text-xl font-bold text-white mt-8">11. Foro e legislação aplicável</h2>
              <p>Esta política é regida pela legislação brasileira, em especial pela Lei nº 13.709/2018 (LGPD) e pelo Marco Civil da Internet (Lei nº 12.965/2014). Fica eleito o foro da comarca de Franca-SP para dirimir quaisquer controvérsias.</p>

              {/* 12 - Contact */}
              <h2 className="font-serif text-xl font-bold text-white mt-8">12. Contato geral</h2>
              <p>Para esclarecer dúvidas sobre esta política, solicitar alterações ou exercer seus direitos, utilize nossos canais oficiais:</p>
              <ul className="ml-6 list-disc space-y-1 mt-2">
                <li><strong className="text-white">E-mail DPO:</strong> <a href="mailto:dpo@reidasvendas.com.br" className="text-[#D6A84F]">dpo@reidasvendas.com.br</a></li>
                <li><strong className="text-white">E-mail geral:</strong> <a href={`mailto:${BRAND.email}`} className="text-[#D6A84F]">{BRAND.email}</a></li>
                <li><strong className="text-white">WhatsApp:</strong> <a href={BRAND.whatsapp} className="text-[#D6A84F]">Falar conosco</a></li>
                <li><strong className="text-white">Formulário:</strong> <Link to="/contato" className="text-[#D6A84F]">Página de contato</Link></li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <PremiumButton href="/contato">
                <Mail className="h-4 w-4" />
                Falar com o DPO
              </PremiumButton>
              <Link to="/" className="btn-outline-gold text-sm group">
                Voltar ao início <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
