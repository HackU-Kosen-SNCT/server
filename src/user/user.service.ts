import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemCategory } from 'src/laf/laf.dto';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUserByRegistrant(registrant: string): Promise<User> {
    // 見つからなかった場合 undefined が return される
    // 見つかった場合 { registrant: '', searching_category: '' } が返却される
    const found = await this.userRepository.findOne(registrant);
    return found;
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<User> {
    const { registrant, searching_category } = updateCategoryDto;
    const user = await this.getUserByRegistrant(registrant);
    if (!user) return user;
    user.searching_category = searching_category;
    await this.userRepository.save(user);

    return user;
  }

  // ユーザーが新規登録された時にDBにセットする
  async registerUser(registrant: string) {
    if (!registrant) return;
    const user = new User();
    user.registrant = registrant;
    user.searching_category = 'unset';
    await this.userRepository.save(user);
  }

  // カテゴリを受け取り、そのカテゴリを`searching_category`にしているユーザーのid(registrant)を返却する
  // /lafのPOSTリクエストが呼ばれた時にこれを呼び出すことで該当するUserのIDを取得
  // そこからカルーセルメッセージの関数を呼ぶことでLINEへ送信
  async userIdsToFindThatCategory(category: ItemCategory) {
    return await this.userRepository.find({
      // registrantのみ取得する
      select: ['registrant'],
      where: { searching_category: category },
    });
  }
}
