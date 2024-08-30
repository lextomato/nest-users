export interface EmailTemplates {
  accountActivation?: (data: any) => string;
  passwordRecovery?: (data: any) => string;
}
