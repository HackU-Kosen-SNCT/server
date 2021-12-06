import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateLafItemDto, ReceiveDto, RegistrantDto } from './laf.dto';
import { Laf } from './laf.entity';
import { LafService } from './laf.service';

const mockRepository = () => ({
  find: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

describe('LafService', () => {
  let service: LafService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LafService,
        { provide: getRepositoryToken(Laf), useFactory: mockRepository },
      ],
    }).compile();

    service = await module.get<LafService>(LafService);
    repository = await module.get(getRepositoryToken(Laf));
  });

  describe('getLafItems', () => {
    it('get all laf items', async () => {
      repository.find.mockResolvedValue('mockLafs');
      expect(repository.find).not.toHaveBeenCalled();

      const result = await service.getLafItems();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual('mockLafs');
    });
  });

  describe('createLafItem', () => {
    it('create laf item', async () => {
      const mockCreateLafItemDto: CreateLafItemDto = {
        item_id: '20211205170917500',
        category: 'clothing',
        detail: 'スポーツタオル',
        latitude: 82.28422,
        longitude: 78.28292,
        image_url:
          'https://pbs.twimg.com/profile_images/1425448503010988032/p8GuVmXX_400x400.jpg',
        created_at: new Date(),
      };
    });
  });

  describe('registrant', () => {
    it('success register', async () => {
      const mockRegistrantDto: RegistrantDto = {
        item_id: '20211205170917500',
        registrant: '82jsa982f90',
      };
    });
  });

  describe('receive', () => {
    it('success receive', async () => {
      const mockReceiveDto: ReceiveDto = {
        item_id: '20211205170917500',
        message: 'ありがとう！',
        received_at: new Date(),
      };
    });
  });
});
