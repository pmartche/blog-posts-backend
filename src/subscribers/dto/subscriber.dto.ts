import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSubscriberDto {
  @Field()
  name: string;

  @Field(() => Int)
  postId: number;
}
