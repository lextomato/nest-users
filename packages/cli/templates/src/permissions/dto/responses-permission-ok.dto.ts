import { ApiProperty } from '@nestjs/swagger';

export class ResponsePermissionUpdateDto {
  @ApiProperty({ description: 'Es update valido?', example: true })
  update: boolean;
}
