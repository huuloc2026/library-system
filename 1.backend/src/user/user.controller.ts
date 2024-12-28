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
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

import { CreateUserDto } from './dto/User.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Public } from 'src/auth/decoraters/public-decorator';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() body: CreateUserDto) {
    try {
      return this.userService.create(body);
    } catch (error) {
      throw new ExceptionsHandler();
    }
  }

  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch()
  UpdateUser(@Body() updateUser) {
    try {
      return this.userService.updatebyId(updateUser.id, updateUser);
    } catch (error) {
      throw new ExceptionsHandler();
    }
  }
  @Delete(':id')
  DeleteUser(@Param('id') id: number) {
    try {
      return this.userService.remove(Number(id));
    } catch (error) {
      throw new ExceptionsHandler();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('pagination')
  async pagination(
    @Query() query: string,
    @Query('skip') skip: string,
    @Query('limit') limit: string,
  ) {
    try {
      const skipInt = +skip;
      const limitInt = +limit;
      return this.userService.paginationQuery(skipInt, limitInt);
    } catch (error) {
      throw new ExceptionsHandler();
    }
  }
}
