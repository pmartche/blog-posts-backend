import { Injectable } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface';
import { CreateCatDto } from '../dto/create-cat.dto';

@Injectable()
export class MockCatsService {
  private readonly cats: Cat[] = [];

  create(cat: CreateCatDto) {
    console.log('create');
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(num: number): Cat {
    return this.cats.find(({ id }) => id === num);
  }
}
