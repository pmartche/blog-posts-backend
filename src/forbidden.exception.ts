import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor() {
    super('overwritten message', HttpStatus.BAD_GATEWAY, {
      cause: new Error(),
      description: 'error description',
    });
  }
}
