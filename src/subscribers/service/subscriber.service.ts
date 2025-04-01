import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSubscriberDto } from '../dto/subscriber.dto';

@Injectable()
export class SubscribersService {
  constructor(private prismaService: PrismaService) {}

  // async findAll() {
  //   return this.prismaService.subscriber.findMany();
  // }

  // async findOneById(id: number) {
  //   return this.prismaService.subscriber.findUnique({ where: { id } });
  // }

  // async createOne(subscriber: CreateSubscriberDto) {
  //   return this.prismaService.subscriber.create({ data: subscriber });
  // }

  // async removeOne(id: number) {
  //   return this.prismaService.subscriber.delete({ where: { id } });
  // }
}
