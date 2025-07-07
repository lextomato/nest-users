import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(
    @Inject('EMAIL_TRANSPORT')
    private readonly transporter: nodemailer.Transporter,
    @Inject('EMAIL_TEMPLATES')
    private readonly templates: { [key: string]: (data: any) => string },
  ) {}

  async sendMail(
    to: string,
    subject: string,
    templateName: string,
    templateData: any,
  ): Promise<void> {
    const template = this.templates[templateName]; // Selecciona la plantilla por nombre
    if (!template) {
      throw new Error(`Template ${templateName} not found`);
    }

    const body = template(templateData); // Usa la plantilla seleccionada

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html: body,
    };

    // Verificar la conexión antes de continuar
    try {
      await this.transporter.verify(); // Verifica la conexión SMTP
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Failed to establish connection to SMTP server.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.transporter.sendMail(mailOptions);
  }
}
