import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @Expose({ name: 'user_id' })
  @IsUUID()
  user_id: string;

  @ApiProperty()
  @Expose({ name: 'task_id' })
  @IsUUID()
  task_id: string;
}
