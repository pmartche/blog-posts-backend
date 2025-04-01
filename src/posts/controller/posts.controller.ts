import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { Prisma } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async getOneById(@Param('id') id: string) {
    return this.postsService.findOneById(+id);
  }

  @Post()
  async createPost(@Body() createPostDto: Prisma.PostCreateInput) {
    return this.postsService.createOne(createPostDto);
  }

  @Patch(':id')
  async upvotePost(@Param('id') id: string) {
    return this.postsService.upvoteById(+id);
  }
}
