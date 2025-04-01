import { Injectable } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface';
import { CreateCatDto } from '../dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: CreateCatDto) {
    const id = this.cats.length + 1;
    this.cats.push({ id, ...cat });
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(num: number): Cat {
    return this.cats.find(({ id }) => id === num);
  }
}
