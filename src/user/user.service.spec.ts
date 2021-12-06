import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateCategoryDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

const mockRepository = () => ({
  find: jest.fn(),
  save: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        // mockRepositoryで代用するってこと？
        // getRepositoryToken: Entity -> Repository Tokenの変換器
        // リポジトリのモックを作成する時に役立つ
        { provide: getRepositoryToken(User), useFactory: mockRepository },
      ],
    }).compile();

    service = await module.get<UserService>(UserService);
    repository = await module.get(getRepositoryToken(User));
  });

  describe('updateCategory', () => {
    const mockUpdateCategoryDto: UpdateCategoryDto = {
      registrant: 'i8sj289g',
      searching_category: 'unset',
    };
    it('update category', async () => {
      // others -> unsetになることを確認する

      // 返す値の定義
      service.getUserByRegistrant = jest.fn().mockResolvedValue({
        registrant: 'i8sj289g',
        searching_category: 'others',
      });

      // 呼ばれていないことの確認
      expect(service.getUserByRegistrant).not.toHaveBeenCalled();

      const result = await service.updateCategory(mockUpdateCategoryDto);

      // 呼ばれたことの確認
      expect(service.getUserByRegistrant).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
      expect(result.searching_category).toEqual(
        mockUpdateCategoryDto.searching_category,
      );
    });

    it(`can't update category`, async () => {
      // そのようなユーザー(registrant)が存在しない場合のテスト
      service.getUserByRegistrant = jest.fn().mockResolvedValue(undefined);

      expect(service.getUserByRegistrant).not.toHaveBeenCalled();

      const result = await service.updateCategory(mockUpdateCategoryDto);

      expect(service.getUserByRegistrant).toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
      expect(result).toEqual(undefined);
    });
  });
});
