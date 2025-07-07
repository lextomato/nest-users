import { EmailTemplates } from 'src/mail/interface/email-template.interface';

export const STATUS_ACTIVE = true;
export const STATUS_INACTIVE = false;

export const DEFAULT_TEMPLATES: EmailTemplates = {
  accountActivation: (data) => `
      <h1>Activación de Cuenta</h1>
      <p>Hola ${data.name} ${data.lastname}, por favor activa tu cuenta usando este <a href="${data.link}">enlace</a>.</p>
    `,
  passwordRecovery: (data) => `
      <h1>Recuperación de Contraseña</h1>
      <p>Hola ${data.name} ${data.lastname}, puedes recuperar tu contraseña usando este <a href="${data.link}">enlace</a>.</p>
    `,
};
