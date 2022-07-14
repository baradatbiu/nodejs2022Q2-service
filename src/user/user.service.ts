import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ERRORS } from './../types/Error';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

  create(createUserDto: CreateUserDto): UserEntity {
    const user = new UserEntity({
      id: v4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now() / 1000,
      updatedAt: Date.now() / 1000,
    });

    this.users.push(user);

    return user;
  }

  findAll(): UserEntity[] {
    return this.users;
  }

  findOne(id: string): UserEntity {
    const user = this.users.find(({ id: userId }) => userId === id);

    if (!user) throw new NotFoundException(ERRORS.NOT_FOUND);

    return user;
  }

  update(
    id: string,
    { oldPassword, newPassword: password }: UpdateUserDto,
  ): UserEntity {
    const user = this.users.find(({ id: userId }) => userId === id);

    if (!user) throw new NotFoundException(ERRORS.NOT_FOUND);
    if (user.password !== oldPassword) {
      throw new ForbiddenException(ERRORS.FORBIDDEN);
    }

    Object.assign(user, {
      password,
      version: ++user.version,
      updatedAt: Date.now() / 1000,
    });

    return user;
  }

  remove(id: string): UserEntity {
    const user = this.users.find(({ id: userId }) => userId === id);

    if (!user) throw new NotFoundException(ERRORS.NOT_FOUND);

    this.users = this.users.filter(({ id: userId }) => userId !== id);

    return user;
  }
}
