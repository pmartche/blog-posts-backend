import { Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { INQUIRER, ModuleRef } from '@nestjs/core';
import { CatsService } from 'src/cats/service/cats.service';

@Injectable()
export class AppService implements OnModuleInit {
  private catsService: CatsService;
  constructor(
    @Inject(INQUIRER) private parentClass: object,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.catsService = this.moduleRef.get(CatsService, { strict: false });
  }

  findAllCats() {
    return this.catsService.findAll();
  }

  getMessage(message: string): string {
    return `${this.parentClass?.constructor?.name}: ${message}`;
  }

  getHomepage(): string {
    return 'homepage';
  }
}
