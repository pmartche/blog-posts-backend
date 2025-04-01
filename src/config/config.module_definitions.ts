import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ConfigModuleOptions } from 'src/interface/configModuleOptions.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ConfigModuleOptions>().build();
