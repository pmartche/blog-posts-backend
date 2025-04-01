import {
  Directive,
  Field,
  Int,
  ObjectType,
  ResolveField,
} from '@nestjs/graphql';
import { Post } from 'src/posts/models/post.model';
import {
  Author as AuthorDb,
  Post as PostDb,
  PrismaClient,
} from '@prisma/client';
import { number } from 'zod';

@ObjectType()
// @Directive('@extends')
// @Directive('@key(fields: "id")')
export class Author {
  @Field(() => Int)
  // @Directive('@external')
  id: AuthorDb['id'];

  @Field(() => String, { nullable: true })
  name?: AuthorDb['name'];
}
