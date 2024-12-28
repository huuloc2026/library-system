import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { hashPasswordHelper } from 'src/common/utils/hash';
import { RegisterNewuserDTO } from 'src/auth/dto/CreateUserDto';
import { faker } from '@faker-js/faker';
import * as dayjs from 'dayjs';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private emailsent: MailService,
  ) {}

  // Create a new user
  async create(body: Prisma.UserCreateInput) {
    try {
      const existingUser = await this.databaseService.user.findUnique({
        where: { email: body.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await hashPasswordHelper(body.password, 8);

      return await this.databaseService.user.create({
        data: { ...body, password: hashedPassword },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async paginationQuery(skip: number, take: number) {
    try {
      const results = await this.databaseService.user.findMany({
        skip: skip,
        take: take,
        where: {},
      });

      const total = await this.databaseService.user.count();
      return {
        data: results,
        meta: {
          skip,
          take,
          total,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async findbyEmail(email: string) {
    try {
      return await this.databaseService.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to findbyEmail users');
    }
  }

  // Find all users
  async findAll() {
    try {
      return await this.databaseService.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }
  // Find one user by ID
  async findOne(id: number) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  // Update user by ID
  async updatebyId(id: number, body: any) {
    try {
      const user = await this.databaseService.user.findUniqueOrThrow({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      if (body.password) {
        body.password = await hashPasswordHelper(body.password as string, 8);
      }
      const result = await this.databaseService.user.update({
        where: { id: id },
        data: body,
      });
      delete result.password;
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  // Delete user by ID
  async remove(id: number) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      await this.databaseService.user.delete({
        where: { id },
      });
      return { message: `User with ID ${id} successfully deleted` };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  // Register new
  async register(body: RegisterNewuserDTO) {
    const existingUser = await this.databaseService.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    //hash password
    const hashedPassword = await hashPasswordHelper(body.password, 8);
    // step 3: send email
    const user = await this.databaseService.user.create({
      data: {
        ...body,
        CodeId: faker.string.uuid(),
        CodeExpired: dayjs().add(1, 'minutes').toDate(),
        password: hashedPassword,
      },
    });
    const sentEmail = await this.emailsent.sendUserConfirmation(
      user.email,
      user.CodeId,
    );
    return sentEmail
  }
}
