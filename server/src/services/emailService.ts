import nodemailer from "nodemailer";
import { templateLembrete } from "../templates/lembrete";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function enviarLembrete(
  emailCliente: string,
  nomeCliente: string,
  tituloLivro: string,
  dataPrevistaDevolucao: string
): Promise<void> {
  await transporter.sendMail({
    from: `"Biblioteca Escolar" <${process.env.SMTP_USER}>`,
    to: emailCliente,
    subject: "Lembrete de Devolução - Biblioteca Escolar",
    html: templateLembrete(nomeCliente, tituloLivro, dataPrevistaDevolucao),
  });
}
