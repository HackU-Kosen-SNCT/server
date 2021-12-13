import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateLafItemDto } from './laf.dto';

export class CreatePipe implements PipeTransform {
  readonly allowCategories = [
    'wallet',
    'smartPhone',
    'waterBottle',
    'stationery',
    'key',
    'usb',
    'textbook/notebook/file',
    'earphone',
    'calculator',
    'umbrella',
    'clothing',
    'others',
  ];

  readonly allowColors = [
    '#FFFFFF',
    '#02331B',
    '#999999',
    '#FF2323',
    '#FF3399',
    '#FF33FF',
    '#9933FF',
    '#3333FF',
    '#3399FF',
    '#33FFFF',
    '#33FF33',
    '#99FF33',
    '#FFFF33',
    '#FF9933',
  ];

  transform(value: CreateLafItemDto) {
    const category = value.category;
    const color = value.color;

    if (!this.isCategoryValid(category) || !this.isColorValid(color)) {
      throw new BadRequestException(
        'The value of the category or color is not appropriate.',
      );
    }
    return value;
  }

  private isCategoryValid(category: string) {
    const result = this.allowCategories.indexOf(category);
    return result !== -1;
  }

  private isColorValid(color: string) {
    const result = this.allowColors.indexOf(color);
    return result !== -1;
  }
}
