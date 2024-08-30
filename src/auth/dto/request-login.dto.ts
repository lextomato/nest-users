import { ApiProperty } from '@nestjs/swagger';

export class RequestLoginDto {
  @ApiProperty({
    description: 'El email de usuario',
    example: 'ejemplo@dominio.com',
  })
  email: string;

  @ApiProperty({
    description: 'La password de usuario',
    example: 'AQ34Rt80JHp90',
  })
  password: string;
}
