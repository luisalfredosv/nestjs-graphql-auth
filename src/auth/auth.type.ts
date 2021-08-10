import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthType {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}