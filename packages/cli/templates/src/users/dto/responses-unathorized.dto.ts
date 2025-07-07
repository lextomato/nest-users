import { ApiProperty } from '@nestjs/swagger';

export class ResponseUnathorizedDto {
  @ApiProperty({
    description: 'Mensaje del response',
    example: 'Unauthorized',
  })
  message: string;

  @ApiProperty({ description: 'Codigo de estatus del response', example: 401 })
  statusCode: number;
}
