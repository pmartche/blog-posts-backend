import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { Author } from './models/author.model';
import { Post } from 'src/posts/models/post.model';
import { GetAuthorArgs } from './dto/get-author.args';
import { AuthorsService } from './services/authors.service';
import { PostsService } from 'src/posts/services/posts.service';
import { UpvotePostInput } from './services/upvotePostInput';
import { CreateAuthorDto } from './dto/author.dto';
import { Subscriber } from 'src/subscribers/model/subscriber.model';
import { SubscribersService } from 'src/subscribers/service/subscriber.service';
// has to be the same as the @ObjectType() classname
@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
    // private subscribersService: SubscribersService,
  ) {}

  @Query(() => [Author], { name: 'authors' })
  async getAllAuthors() {
    return this.authorsService.findAll();
  }

  @Query(() => Author, { name: 'author' })
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField('posts', () => [Post])
  async getPosts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAllByAuthor(id);
  }

  // @ResolveReference()
  // resolveReference(reference: { __typename: string; id: number }) {
  //   const { id } = reference;
  //   return this.authorsService.findOneById(id);
  // }

  // @ResolveField('subscribers', () => [Subscriber])
  // async getSubscribers(@Parent() post: Post) {
  //   const { id } = post;
  //   return this.subscribersService.findAll();
  // }

  @Mutation(() => Author, { name: 'newAuthor' })
  async createAuthor(
    @Args('createAuthorDto')
    createAuthorDto: CreateAuthorDto,
  ) {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @Mutation(() => Author, { name: 'authorToRemove' })
  async removeAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.removeAuthor(id);
  }
}
