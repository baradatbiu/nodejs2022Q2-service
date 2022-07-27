import { User } from './../interfaces/user.interface';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
