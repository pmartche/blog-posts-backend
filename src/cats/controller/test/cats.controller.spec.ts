import { Test } from '@nestjs/testing';
import { CatsService } from '../../service/cats.service';
import { CatsController } from '../cats.controller';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { ModuleRef } from '@nestjs/core';

const moduleMocker = new ModuleMocker(global);

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      // providers: [CatsService],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === CatsService)
          return { findAll: jest.fn().mockRejectedValue(results) };
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    catsController = moduleRef.get(CatsService);
  });

  // describe('findAll', () => {
  //   it('should return an array of cats', async () => {
  //     const result = ['test'];
  //     jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

  //     expect(await catsController.findAll()).toBe(result);
  //   });
  // });
});
