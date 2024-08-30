import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateUserConflictDto {
  @ApiProperty({ description: 'Estatus del response', example: 'error' })
  status: string;

  @ApiProperty({
    description: 'Mensaje del response',
    example: 'El email ya existe.',
  })
  message: string;

  @ApiProperty({
    description: 'El email de usuario',
    example: 'ejemplo@dominio.com',
  })
  email: string;
}

export class ResponseUserConflictDto {
  @ApiProperty({ description: 'Estatus del response', example: 'error' })
  status: string;

  @ApiProperty({
    description: 'Mensaje del response',
    example: 'No se encuentra usuario.',
  })
  message: string;

  @ApiProperty({
    description: 'Identificador de usuario',
    example: 'c72dbyy5-21bf-4099-a6fb-2eb576bac434',
  })
  userUuid: string;
}

export class ResponseUserBadRequestDto {
  @ApiProperty({ description: 'Estatus del response', example: 'error' })
  status: string;

  @ApiProperty({
    description: 'Mensaje del response',
    example: 'Rol no existe.',
  })
  message: string;

  @ApiProperty({
    description: 'Propiedad del error',
    example: 'roleId',
  })
  property: string;

  @ApiProperty({
    description: 'Valor de la propiedad del error',
    example: 1,
  })
  valueProperty: any;
}
