import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class ConfigModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [{ provide: 'configOptions', useValue: options }],
      exports: [],
    };
  }
}
