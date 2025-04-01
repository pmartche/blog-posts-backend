import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostDto {
  @Field()
  title: string;

  @Field({ nullable: true })
  votes?: number;

  @Field(() => Int)
  authorId: number;
}
