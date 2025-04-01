import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Header,
  Param,
  HostParam,
  Body,
  HttpException,
  HttpStatus,
  ForbiddenException,
  UseFilters,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDto, createCatSchema } from '../dto/create-cat.dto';
import { CatsService } from '../service/cats.service';
import { Cat } from '../interfaces/cat.interface';
import { CustomException } from 'src/forbidden.exception';
import { HttpExceptionFilter } from 'src/cats/filters/http-exception.filters';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { TranformInterceptor } from '../interceptor/transform.interceptor';
// import { ZodValidationPipe } from './pipe/validation.pipe';

@Controller('cats')
// better to use class as opposed to an instance
@UseFilters(HttpExceptionFilter)
@UseGuards(RolesGuard)
@Roles(['user'])
@UseInterceptors(LoggingInterceptor, TranformInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Header('Cache-Control', 'none')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(['admin'])
  // @UsePipes(new ZodValidationPipe(createCatSchema))
  async create(@Body(ValidationPipe) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Cat {
    console.log(id);
    if (id < 1) throw new CustomException();
    return this.catsService.findOne(id);
  }
}

@Controller({ host: ':account.example.com' })
export class AccountController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}
