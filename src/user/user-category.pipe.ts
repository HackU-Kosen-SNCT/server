import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UpdateCategoryDto } from './user.dto';

export class UserCategoryPipe implements PipeTransform {
  readonly allowCategories = [
    'valuables',
    'stationery',
    'clothing',
    'others',
    'unset',
  ];

  transform(value: UpdateCategoryDto) {
    const searching_category = value.searching_category.toLowerCase();

    if (!this.isCategoryValid(searching_category)) {
      throw new BadRequestException();
    }
    return value;
  }

  private isCategoryValid(category: string) {
    const result = this.allowCategories.indexOf(category);
    return result !== -1;
  }
}
