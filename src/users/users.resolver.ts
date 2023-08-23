import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { DeleteUserInput } from './dto/inputs/delete-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args() getUserArgs: GetUserArgs): User {
    return this.usersService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
    return this.usersService.getUsers(getUsersArgs);
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserInput: CreateUserInput): User {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserData') updateUserInput: UpdateUserInput): User {
    return this.usersService.updateUser(updateUserInput);
  }

  @Mutation(() => User)
  deleteUser(@Args('deleteUserData') deleteUserInput: DeleteUserInput): User {
    return this.usersService.deleteUser(deleteUserInput);
  }
}
