// import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UpdateCategoryDto } from './user.dto';
import { UserService } from './user.service';

const mockService = () => ({
  updateCategory: jest.fn(),
});

describe('UserController', () => {
  let controller: UserController;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useFactory: mockService }],
    }).compile();

    controller = await module.get<UserController>(UserController);
    service = await module.get<UserService>(UserService);
  });

  describe('updateCategory', () => {
    const mockUpdateCategoryDto: UpdateCategoryDto = {
      registrant: 'i8sj289g',
      searching_category: 'unset',
    };
    it('update category', async () => {
      service.updateCategory = jest.fn().mockResolvedValue({
        registrant: 'i8sj289g',
        searching_category: 'unset',
      });

      expect(service.updateCategory).not.toHaveBeenCalled();
      const result = await controller.updateCategory(mockUpdateCategoryDto);

      expect(service.updateCategory).toHaveBeenCalled();
      expect(result).toEqual(mockUpdateCategoryDto);
    });

    // it(`can't update category`, async () => {
    //   service.updateCategory = jest.fn().mockResolvedValue(undefined);
    //   expect(service.updateCategory).not.toHaveBeenCalled();
    //   expect(() => {
    //     controller.updateCategory(mockUpdateCategoryDto);
    //   }).rejects.toThrow();
    //   expect(service.updateCategory).toHaveBeenCalled();
    // });
  });
});
