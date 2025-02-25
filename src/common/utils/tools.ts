import * as bcrypt from 'bcryptjs';

// Configuración para usar un fallback en caso de que no haya un módulo de criptografía disponible
bcrypt.setRandomFallback(require('crypto').randomBytes);

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};
