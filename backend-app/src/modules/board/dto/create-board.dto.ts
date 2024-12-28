import { IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(2)
  status: number;

  @ApiProperty()
  @Expose({ name: 'workplace_id' })
  @IsUUID()
  workplace_id: string;
}
