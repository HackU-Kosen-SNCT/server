import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserCategory } from 'src/category.type';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  registrant: string;

  @ApiProperty()
  @IsNotEmpty()
  searching_category: UserCategory;
}
