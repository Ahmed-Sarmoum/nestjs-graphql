import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteUserInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
