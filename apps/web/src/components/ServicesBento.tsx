import { Link } from 'react-router-dom';
import { Globe, Smartphone, Workflow, BarChart3, GraduationCap, ArrowUpRight } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type Service = {
  key: string;
  title: string;
  description: string;
  to: string;
  icon: typeof Globe;
  image: string;
  span: string;
  large?: boolean;
};

const services: Service[] = [
  {
    key: 'sites',
    title: 'Sites',
    description: 'Presença institucional que organiza intenção, prova e contato — responsiva e preparada para a busca local.',
    to: '/servicos',
    icon: Globe,
    image: BRAND.images.services.sites,
    span: 'lg:col-span-4 lg:row-span-2',
    large: true,
  },
  {
    key: 'apps',
    title: 'Aplicativos',
    description: 'Interfaces enxutas desenhadas a partir do processo real da operação.',
    to: '/solucoes/app-para-empresas',
    icon: Smartphone,
    image: BRAND.images.services.apps,
    span: 'lg:col-span-2',
  },
  {
    key: 'automations',
    title: 'Automações',
    description: 'Contexto e continuidade entre formulário, equipe e WhatsApp.',
    to: '/solucoes/automacao-whatsapp',
    icon: Workflow,
    image: BRAND.images.services.automations,
    span: 'lg:col-span-2',
  },
  {
    key: 'dashboards',
    title: 'Dashboards',
    description: 'Painéis que transformam sinais dispersos em prioridades operacionais e decisão.',
    to: '/solucoes/sistema-sob-medida',
    icon: BarChart3,
    image: BRAND.images.services.dashboards,
    span: 'lg:col-span-3',
  },
  {
    key: 'mentoria',
    title: 'Mentoria',
    description: 'Estrutura vendas online, marketing digital e presença digital do zero à escala.',
    to: '/diagnostico',
    icon: GraduationCap,
    image: BRAND.images.services.mentoria,
    span: 'lg:col-span-3',
  },
];

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Link
      to={service.to}
      onClick={() => trackEvent('service_select', { service: service.key, origin: 'home-bento' })}
      className={cn(
        'rdv-bento-card group flex flex-col p-6 sm:p-7',
        service.large && 'rdv-bento-card--large min-h-[320px] sm:min-h-[360px]',
        service.span
      )}
    >
      <img
        src={service.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="rdv-bento-image"
        aria-hidden="true"
      />
      {service.large && <div className="rdv-bento-overlay" aria-hidden="true" />}

      <div className={cn('relative z-10 flex h-full flex-col', service.large && 'justify-end')}>
        <div className={cn('flex items-start', service.large ? 'justify-between' : 'justify-between')}>
          <span className="rdv-bento-icon">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="rdv-bento-arrow" aria-hidden="true">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className={service.large ? 'mt-24' : 'mt-6'}>
          <h3 className="font-serif text-xl font-bold text-white sm:text-2xl">{service.title}</h3>
          <p className={cn('mt-2 text-sm leading-relaxed', service.large ? 'max-w-md text-[#D4D4D8]' : 'text-[#A1A1AA]')}>
            {service.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function ServicesBento() {
  return (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-6">
      {services.map((service) => (
        <ServiceCard key={service.key} service={service} />
      ))}
    </div>
  );
}
