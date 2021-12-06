import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserCategory } from './user.dto';

export class UserCategoryPipe implements PipeTransform {
  readonly allowCategories = [
    'valuables',
    'stationery',
    'clothing',
    'others',
    'unset',
  ];

  transform(value: UserCategory) {
    const searching_category = value.toLowerCase();

    if (!this.isCategoryValid(searching_category)) {
      throw new BadRequestException();
    }
    return searching_category;
  }

  private isCategoryValid(category: string) {
    const result = this.allowCategories.indexOf(category);
    return result !== -1;
  }
}
