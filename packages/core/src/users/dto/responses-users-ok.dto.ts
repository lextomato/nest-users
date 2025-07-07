import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserUpdateDto {
  @ApiProperty({ description: 'Es update valido?', example: true })
  update: boolean;
}
