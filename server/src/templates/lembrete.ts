export function templateLembrete(
  nomeCliente: string,
  tituloLivro: string,
  dataPrevista: string
): string {
  const dataFormatada = new Date(dataPrevista).toLocaleDateString("pt-BR");

  return `
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #10B981; padding: 24px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 22px;">Biblioteca Escolar</h1>
    </div>
    <div style="padding: 24px; color: #374151; font-size: 15px; line-height: 1.6;">
      <p style="margin: 0 0 16px;">Olá, <strong style="color: #111827;">${nomeCliente}</strong>!</p>
      <p style="margin: 0 0 16px;">Identificamos que o empréstimo do livro <strong style="color: #10B981;">${tituloLivro}</strong> está com a devolução atrasada.</p>
      <p style="margin: 0 0 16px;">A data prevista de devolução era <strong style="color: #10B981;">${dataFormatada}</strong>.</p>
      <p style="margin: 0;">Pedimos a gentileza de regularizar a devolução o quanto antes.</p>
    </div>
    <div style="background-color: #f3f4f6; padding: 16px 24px; text-align: center; color: #6b7280; font-size: 12px;">
      Este é um e-mail automático, não responda.
    </div>
  </div>`;
}
