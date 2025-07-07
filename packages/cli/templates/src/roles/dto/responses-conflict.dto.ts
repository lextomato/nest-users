import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateRoleConflictDto {
  @ApiProperty({ description: 'Estatus del response', example: 'error' })
  status: string;

  @ApiProperty({
    description: 'Mensaje del response',
    example: 'El rol ya existe.',
  })
  message: string;

  @ApiProperty({
    description: 'El nombre del rol',
    example: 'usuario',
  })
  role: string;
}

export class ResponseRoleConflictDto {
  @ApiProperty({ description: 'Estatus del response', example: 'error' })
  status: string;

  @ApiProperty({
    description: 'Mensaje del response',
    example: 'No se encuentra el rol.',
  })
  message: string;

  @ApiProperty({
    description: 'Identificador de usuario',
    example: 1,
  })
  roleId: number;
}
