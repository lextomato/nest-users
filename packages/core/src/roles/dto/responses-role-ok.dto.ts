import { ApiProperty } from '@nestjs/swagger';

export class ResponseRoleUpdateDto {
  @ApiProperty({ description: 'Es update valido?', example: true })
  update: boolean;
}
