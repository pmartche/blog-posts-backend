import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorsService } from '../services/authors.service';
import { Author } from '../models/author.model';
import { CreateAuthorDto } from '../dto/author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async getAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  async getAuthor(@Param('id') id: string) {
    return await this.authorsService.findOneById(+id);
  }

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    this.authorsService.createAuthor(createAuthorDto);
  }
}
