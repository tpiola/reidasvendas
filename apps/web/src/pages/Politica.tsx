import { Reveal } from '@/hooks/useAnimation';

export default function Politica() {
  return (
    <main>
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <span className="section-label">Privacidade</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl">
              Política de <span className="text-gradient-gold">Privacidade</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="space-y-6 text-sm leading-relaxed text-[#A1A1AA]">
              <p><strong className="text-white">Última atualização:</strong> Junho de 2026</p>

              <h2 className="font-serif text-xl font-bold text-white mt-8">1. Informações que coletamos</h2>
              <p>Coletamos informações fornecidas voluntariamente por você ao preencher formulários em nosso site, como nome, e-mail, WhatsApp e mensagem. Também coletamos dados de navegação através de cookies e ferramentas de análise.</p>

              <h2 className="font-serif text-xl font-bold text-white mt-8">2. Como usamos suas informações</h2>
              <p>Utilizamos seus dados para: responder suas solicitações de contato, enviar comunicações relacionadas aos nossos serviços, melhorar nossa plataforma e cumprir obrigações legais.</p>

              <h2 className="font-serif text-xl font-bold text-white mt-8">3. Compartilhamento de dados</h2>
              <p>Não vendemos seus dados pessoais. Podemos compartilhar informações com parceiros de tecnologia que nos auxiliam na operação do site (hospedagem, análise de dados), sempre sob contratos de confidencialidade.</p>

              <h2 className="font-serif text-xl font-bold text-white mt-8">4. Seus direitos</h2>
              <p>Você tem direito a: acessar seus dados pessoais, corrigir dados incompletos ou desatualizados, solicitar a exclusão de seus dados, revogar consentimento a qualquer momento.</p>

              <h2 className="font-serif text-xl font-bold text-white mt-8">5. Cookies</h2>
              <p>Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para entender como você interage com nosso conteúdo. Você pode gerenciar suas preferências de cookies a qualquer momento.</p>

              <h2 className="font-serif text-xl font-bold text-white mt-8">6. Segurança</h2>
              <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou destruição. Utilizamos criptografia SSL/TLS em todas as comunicações.</p>

              <h2 className="font-serif text-xl font-bold text-white mt-8">7. Contato</h2>
              <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato pelo e-mail <a href="mailto:contato@reidasvendas.com.br" className="text-[#D6A84F]">contato@reidasvendas.com.br</a>.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
