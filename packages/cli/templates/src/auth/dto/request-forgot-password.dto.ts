import { ApiProperty } from '@nestjs/swagger';

export class RequestForgotPasswordDto {
  @ApiProperty({
    description: 'El email de usuario',
    example: 'ejemplo@dominio.com',
  })
  email: string;
}
