import { ArgsType, Field, Int } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@ArgsType()
export class GetAuthorArgs {
  // @Field((type) => Int)
  // id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ defaultValue: '' })
  @MinLength(3)
  lastName: string;
}
