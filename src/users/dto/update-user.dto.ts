import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'El nombre de usuario', example: 'John' })
  name: string;

  @ApiProperty({ description: 'El apellido de usuario', example: 'Torres' })
  lastname: string;
}

export class UpdateUserRoleDto {
  @ApiProperty({ description: 'id de rol de usuario', example: 1 })
  roleId: number;
}
