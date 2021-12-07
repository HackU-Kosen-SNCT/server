import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateLafItemDto } from './laf.dto';

export class CreateCategoryPipe implements PipeTransform {
  readonly allowCategories = ['valuables', 'stationary', 'clothing', 'others'];

  transform(value: CreateLafItemDto) {
    const category = value.category.toLowerCase();

    if (!this.isCategoryValid(category)) {
      throw new BadRequestException(
        'The value of the category is not appropriate.',
      );
    }
    return value;
  }

  private isCategoryValid(category: string) {
    const result = this.allowCategories.indexOf(category);
    return result !== -1;
  }
}
