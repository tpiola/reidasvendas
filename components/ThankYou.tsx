'use client';
import { useEffect, useState } from 'react';
export default function ThankYou() {
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    setConfirmed(sessionStorage.getItem('rdv-confirmed-lead') === '1');
    sessionStorage.removeItem('rdv-confirmed-lead');
  }, []);
  return (
    <p role="status">
      {confirmed
        ? 'Seu pedido foi recebido. Nossa equipe usará os dados informados para dar continuidade.'
        : 'Para solicitar atendimento, use o diagnóstico ou abra uma conversa no WhatsApp. Esta página, sozinha, não confirma envio, agendamento ou pagamento.'}
    </p>
  );
}
