import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginDto {
  @ApiProperty({ description: 'Es login valido?', example: true })
  login: boolean;

  @ApiProperty({
    description: 'Token de sesion',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVXVpZCI6ImM3MjA4ZGI1LTIxYmYtNDA5OS1hNmZiLTJlYjU3NmJhYzQzNCIsImlhdCI6MTcyNDE3NDE0OCwiZXhwIjoxNzI0Nzc4OTQ4fQ._iQYQTeP0zFmBC5wIeY-ssmqgyInpHIUI1xKwNrV-y0',
  })
  token: string;

  @ApiProperty({
    description: 'Identificador de usuario',
    example: 'c72dbyy5-21bf-4099-a6fb-2eb576bac434',
  })
  userUuid: 'c7208db5-21bf-4099-a6fb-2eb576bac434';
}

export class ResponseCheckSessionDto {
  @ApiProperty({ description: 'Es sesion valida?', example: true })
  isSessionValid: boolean;

  @ApiProperty({
    description: 'Identificador de usuario',
    example: 'c72dbyy5-21bf-4099-a6fb-2eb576bac434',
  })
  userUuid: 'c7208db5-21bf-4099-a6fb-2eb576bac434';
}

export class ResponseLogoutDto {
  @ApiProperty({ description: 'Es logout valido?', example: true })
  logout: boolean;
}

export class ResponseUpdateDto {
  @ApiProperty({ description: 'Es update valido?', example: true })
  update: boolean;
}

export class ResponseForgotPasswordDto {
  @ApiProperty({
    description: 'Se ha enviado correo de recuperacion?',
    example: true,
  })
  result: boolean;
}
