import { InputType, Int, Field, PartialType, OmitType } from '@nestjs/graphql';
import { IsEmail, IsNumber, Length } from 'class-validator';

@InputType()
export class CreateUserInput {

  @Field()
  @IsEmail()
  email: string;
  
  @Field()
  @Length(2, 30)
  password: string;

  @Field()
  @Length(2, 30)
  name: string;

  @Field()
  @Length(2, 30)
  lastName: string;

}

@InputType()
export class FindOneUserInput  {

  @Field()
  @IsEmail()
  email: string;

}

@InputType()
export class UpdateUserInput extends 
OmitType(PartialType(CreateUserInput), ['email','password'] as const ) {

  @Field((type => Int))
  @IsNumber()
  id: number;

}


@InputType()
export class DeleteUserInput {

  @Field()
  @IsNumber()
  id: number;
  
}
