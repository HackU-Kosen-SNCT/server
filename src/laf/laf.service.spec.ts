import { Test, TestingModule } from '@nestjs/testing';
import { LafService } from './laf.service';

describe('LafService', () => {
  let service: LafService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LafService],
    }).compile();

    service = module.get<LafService>(LafService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
