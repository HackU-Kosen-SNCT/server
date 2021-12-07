import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UpdateCategoryDto } from './user.dto';

export class UserCategoryPipe implements PipeTransform {
  readonly allowCategories = [
    'valuables',
    'stationary',
    'clothing',
    'others',
    'unset',
  ];

  transform(value: UpdateCategoryDto) {
    const searching_category = value.searching_category.toLowerCase();

    if (!this.isCategoryValid(searching_category)) {
      throw new BadRequestException(
        'The value of the searching_category is not appropriate.',
      );
    }
    return value;
  }

  private isCategoryValid(category: string) {
    const result = this.allowCategories.indexOf(category);
    return result !== -1;
  }
}
