import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class LoginUserInput {

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(4, 30)
  password: string;
}
