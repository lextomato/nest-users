import { ApiProperty } from '@nestjs/swagger';

export class RequestTokenDto {
  @ApiProperty({
    description: 'El token de usuario',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVXVpZCI6ImM3MjA4ZGI1LTIxYmYtNDA5OS1hNmZiLTJlYjU3NmJhYzQzNCIsImlhdCI6MTcyNDE3Mzk1NiwiZXhwIjoxNzI0Nzc4NzU2fQ.rlz5StPURkiirRCkS7jLKIjgj1p9zcWveUT_e-hUDxO',
  })
  token: string;
}
