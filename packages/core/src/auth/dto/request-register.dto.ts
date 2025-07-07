import { ApiProperty } from '@nestjs/swagger';

export class RequestRegisterDto {
  @ApiProperty({
    description: 'El nombre de usuario',
    example: 'Manuel',
  })
  name: string;

  @ApiProperty({
    description: 'El apellido de usuario',
    example: 'Gomez',
  })
  lastname: string;

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
