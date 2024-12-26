import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService){}
  async create(body: Prisma.UserCreateInput) {
    try {

      const existingUser = await this.databaseService.user.findUnique({
        where: { email: body.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
      const hashPassword = await bcrypt.hash(body.password,8)
      // If not, create the user
      return this.databaseService.user.create({
        data: { ...body, password:hashPassword },
      });
    } catch (error) {
      
        throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }


}
