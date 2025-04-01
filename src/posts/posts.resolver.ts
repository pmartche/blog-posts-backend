import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from './models/post.model';
import { PostsService } from './services/posts.service';
import { CreatePostDto } from './dto/post.dto';
import { AuthorsService } from 'src/authors/services/authors.service';
import { Author } from 'src/authors/models/author.model';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private authorsService: AuthorsService,
  ) {}

  @Query(() => [Post], { name: 'posts' })
  async getAllPosts() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  async getPost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOneById(id);
  }

  @Mutation(() => Post, { name: 'upvotePost' })
  async upvotePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.upvoteById(id);
  }

  @Mutation(() => Post)
  async createPost(@Args('createPostDto') createPostDto: CreatePostDto) {
    return this.postsService.createOne(createPostDto);
  }

  @Mutation(() => Post, { name: 'postToRemove' })
  async deletePost(@Args('id') id: number) {
    return this.postsService.removeOne(id);
  }
}
