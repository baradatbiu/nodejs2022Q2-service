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
  private static users: UserEntity[] = [];

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity({
      id: v4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    UserService.users.push(user);

    return Promise.resolve(user);
  }

  findAll(): Promise<UserEntity[]> {
    return Promise.resolve(UserService.users);
  }

  findOne(id: string): Promise<UserEntity> {
    const user = UserService.users.find(({ id: userId }) => userId === id);

    if (!user) throw new NotFoundException(ERRORS.NOT_FOUND);

    return Promise.resolve(user);
  }

  update(
    id: string,
    { oldPassword, newPassword: password }: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = UserService.users.find(({ id: userId }) => userId === id);

    if (!user) throw new NotFoundException(ERRORS.NOT_FOUND);
    if (user.password !== oldPassword) {
      throw new ForbiddenException(ERRORS.FORBIDDEN);
    }

    Object.assign(user, {
      password,
      version: ++user.version,
      updatedAt: Date.now(),
    });

    return Promise.resolve(user);
  }

  remove(id: string): Promise<UserEntity> {
    const user = UserService.users.find(({ id: userId }) => userId === id);

    if (!user) throw new NotFoundException(ERRORS.NOT_FOUND);

    UserService.users = UserService.users.filter(
      ({ id: userId }) => userId !== id,
    );

    return Promise.resolve(user);
  }
}
