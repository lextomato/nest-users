import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginConflictDto {
  @ApiProperty({ description: 'Estatus del response', example: 'error' })
  status: string;

  @ApiProperty({
    description: 'Mensaje del response',
    example: 'Email incorrecto.',
  })
  message: string;
}

export class ResponseTokenConflictDto {
  @ApiProperty({ description: 'Estatus del response', example: 'error' })
  status: string;

  @ApiProperty({
    description: 'Mensaje del response',
    example: 'Token invalido.',
  })
  message: string;
}

export class ResponseTokenBadRequestDto {
  @ApiProperty({ description: 'Estatus del response', example: 'error' })
  status: string;

  @ApiProperty({
    description: 'Mensaje del response',
    example: 'Token expirado.',
  })
  message: string;

  @ApiProperty({
    description: 'Token de sesion',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVXVpZCI6ImM3MjA4ZGI1LTIxYmYtNDA5OS1hNmZiLTJlYjU3NmJhYzQzNCIsImlhdCI6MTcyNDE3NDE0OCwiZXhwIjoxNzI0Nzc4OTQ4fQ._iQYQTeP0zFmBC5wIeY-ssmqgyInpHIUI1xKwNrV-y0',
  })
  token: string;
}

export class ResponseUserConflictDto {
  @ApiProperty({ description: 'Estatus del response', example: 'error' })
  status: string;

  @ApiProperty({
    description: 'Mensaje del response',
    example: 'Usuario no existe o esta deshabilitado.',
  })
  message: string;

  @ApiProperty({
    description: 'Identificador de usuario',
    example: 'c72dbyy5-21bf-4099-a6fb-2eb576bac434',
  })
  userUuid: string;
}

export class ResponseInternalErrorDto {
  @ApiProperty({ description: 'Estatus del response', example: 'error' })
  status: string;

  @ApiProperty({
    description: 'Mensaje del response',
    example: 'Failed to establish connection to SMTP server',
  })
  message: string;
}
