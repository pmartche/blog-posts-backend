import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // if omitted, prisma will connect lazily on 1st call to db
  async onModuleInit() {
    await this.$connect();
  }
}
