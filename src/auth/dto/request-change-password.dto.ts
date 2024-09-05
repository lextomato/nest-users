import { ApiProperty } from '@nestjs/swagger';

export class RequestChangePasswordDto {
  @ApiProperty({
    description: 'La password de usuario',
    example: 'AQ34Rt80JHp90',
  })
  password: string;
}
