import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAuthorDto {
  @Field()
  name?: string;
}
