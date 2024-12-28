import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsHexColor, IsString, IsUUID } from 'class-validator';

export class CreateLabelDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsHexColor()
  color: string;

  @ApiProperty()
  @Expose({ name: 'task_id' })
  @IsUUID()
  task_id: string;
}
