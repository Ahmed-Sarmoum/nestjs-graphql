import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.id === getUserArgs.id);
  }

  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.ids.map((id) => this.getUser({ id }));
  }

  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      id: uuidv4(),
      ...createUserData,
    };

    this.users.push(user);

    return user;
  }

  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find((user) => user.id === updateUserData.id);

    Object.assign(user, updateUserData);

    return user;
  }

  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === deleteUserData.id,
    );

    const user = this.users[userIndex];
    this.users.splice(userIndex);

    return user;
  }
}
