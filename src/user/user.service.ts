import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ERRORS } from './../types/Error';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const createdUser = this.usersRepository.create({
      ...createUserDto,
    });

    return await this.usersRepository.save(createdUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOneById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(ERRORS.NOT_FOUND);

    return user;
  }

  async findOneByLogin(login: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ login });
  }

  async update(
    id: string,
    { oldPassword, newPassword: password }: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(ERRORS.NOT_FOUND);
    if (user.password !== oldPassword) {
      throw new ForbiddenException(ERRORS.FORBIDDEN);
    }

    Object.assign(user, { password });

    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.usersRepository.delete(id);

    if (affected === 0) throw new NotFoundException(ERRORS.NOT_FOUND);
  }
}
