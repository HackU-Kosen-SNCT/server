import { BadRequestException, PipeTransform } from '@nestjs/common';

export class UserCategoryPipe implements PipeTransform {
  readonly allowCategories = [
    'valuables',
    'stationery',
    'clothing',
    'others',
    'unset',
  ];

  transform(value: string) {
    value = value.toLowerCase();

    if (!this.isCategoryValid(value)) {
      throw new BadRequestException();
    }
  }

  private isCategoryValid(category: string) {
    const result = this.allowCategories.indexOf(category);
    return result !== -1;
  }
}
