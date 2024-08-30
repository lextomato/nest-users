import { IsNotEmpty } from 'class-validator';

export class TokenParamDto {
  @IsNotEmpty({ message: 'El token no puede estar vacío.' })
  token: string;
}
