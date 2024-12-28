import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Workplace } from '../workplace/workplace.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }

  @Get(':userId/workplaces')
  findWorkplaces(@Param('userId') creatorId: string): Promise<Workplace[]> {
    return this.usersService.findWorkplacesByUserId(creatorId);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string): Promise<void> {
    return this.usersService.remove(userId);
  }
}
