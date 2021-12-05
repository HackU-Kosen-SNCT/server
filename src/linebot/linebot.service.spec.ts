import { Test, TestingModule } from '@nestjs/testing';
import { LinebotService } from './linebot.service';

describe('LinebotService', () => {
  let service: LinebotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinebotService],
    }).compile();

    service = module.get<LinebotService>(LinebotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
