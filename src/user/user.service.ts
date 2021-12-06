import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
