import { Injectable } from '@nestjs/common';
import { Post } from '../models/post.model';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.post.findMany();
  }

  async findAllByAuthor(authorId: number) {
    return this.prismaService.post.findMany({
      where: { authorId },
    });
  }

  async findOneById(id: number) {
    return this.prismaService.post.findUnique({
      where: { id },
    });
  }

  async upvoteById(id: number) {
    return this.prismaService.post.update({
      where: { id },
      data: {
        votes: { increment: 1 },
      },
    });
  }

  async createOne(createPostDto: Prisma.PostCreateInput): Promise<Post> {
    return this.prismaService.post.create({
      data: createPostDto,
    });
  }

  async removeOne(id: number) {
    return this.prismaService.post.delete({ where: { id } });
  }
}
