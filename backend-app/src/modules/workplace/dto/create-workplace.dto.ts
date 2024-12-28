import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class CreateWorkplaceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose({ name: 'creator_id' })
  @IsUUID()
  creator_id: string;
}
