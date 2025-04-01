import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function logger(
  request: Request,
  response: Response,
  nextFunction: NextFunction,
) {
  console.log('middleware..');
  nextFunction();
}
