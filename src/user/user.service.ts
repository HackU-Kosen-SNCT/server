import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    const found = await this.userRepository.findOne(registrant);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<User> {
    const { registrant, searching_category } = updateCategoryDto;
    const user = await this.getUserByRegistrant(registrant);
    user.searching_category = searching_category;

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return user;
  }
}
