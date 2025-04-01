import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Scope,
  forwardRef,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import {
  AccountController,
  CatsController,
} from './cats/controller/cats.controller';
import { CatsService } from './cats/service/cats.service';
import { CatsModule } from './cats/cats.module';
import { logger } from './common/middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './cats/filters/http-exception.filters';
import { ConfigModule } from './config/config.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriver,
  ApolloDriverConfig,
  ApolloFederationDriver,
  ApolloFederationDriverAsyncConfig,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthorsService } from './authors/services/authors.service';
import { PostsService } from './posts/services/posts.service';
import { AuthorsResolver } from './authors/authors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsController } from './authors/controller/authors.controller';
import { PrismaService } from './prisma.service';
import { PostsController } from './posts/controller/posts.controller';
import { PostsResolver } from './posts/posts.resolver';

@Module({
  imports: [
    forwardRef(() => CatsModule),
    ConfigModule.register({ folder: './config' }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      include: [CatsModule],
      // autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    // GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    //   driver: ApolloFederationDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // }),
  ],
  controllers: [
    AppController,
    AccountController,
    AuthorsController,
    PostsController,
  ],
  providers: [
    AuthorsResolver,
    PostsResolver,
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
      scope: Scope.REQUEST,
    },
    AuthorsService,
    PostsService,
    PrismaService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .exclude(
        { path: 'cats', method: RequestMethod.DELETE },
        { path: 'cats', method: RequestMethod.PUT },
        'cats/(.*)',
      )
      .forRoutes(CatsController);
  }
}
