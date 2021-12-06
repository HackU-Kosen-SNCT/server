import { Test, TestingModule } from '@nestjs/testing';
import { LinebotController } from './linebot.controller';

describe('LinebotController', () => {
  let controller: LinebotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinebotController],
    }).compile();

    controller = module.get<LinebotController>(LinebotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
