import { Global, Module, forwardRef } from '@nestjs/common';
import { CatsController } from './controller/cats.controller';
import { CatsService } from './service/cats.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filters';
import { ValidationPipe } from './pipe/validation.pipe';
import { MockCatsService } from './service/mock-cats.service';
import { AppModule } from 'src/app.module';

@Global()
@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [CatsController],
  providers: [
    CatsService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: 'MockCatsToken', useValue: MockCatsService },
    {
      provide: 'asyncConnection',
      useFactory: async () => {
        const connection = true;
        // perform async task
        return connection;
      },
    },
  ],
  exports: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
