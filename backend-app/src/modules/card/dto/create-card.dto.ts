import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class CreateCardDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose({ name: 'board_id' })
  @IsUUID()
  board_id: string;
}
