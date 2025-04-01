import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Author, Prisma } from '@prisma/client';

@Injectable()
export class AuthorsService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.author.findMany();
  }

  async findOneById(id: number) {
    return this.prismaService.author.findUnique({
      where: { id },
    });
  }

  async createAuthor(author: Prisma.AuthorCreateInput): Promise<Author> {
    return this.prismaService.author.create({
      data: author,
    });
  }

  async removeAuthor(id: number) {
    return this.prismaService.author.delete({ where: { id } });
  }
}
