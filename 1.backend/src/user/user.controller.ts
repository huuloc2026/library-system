import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

import { CreateUserDto } from './dto/User.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    try {
      return this.userService.create(body);
    } catch (error) {
      throw new ExceptionsHandler();
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @Get('pagination')
  async pagination(@Query('skip') skip: number, @Query('limit') limit: number) {
    try {
      return this.userService.paginationQuery(skip, limit);
    } catch (error) {
      throw new ExceptionsHandler();
    }
  }
}
