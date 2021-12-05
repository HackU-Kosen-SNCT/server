import { Body, Controller, Patch } from '@nestjs/common';
import { UpdateCategoryDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/category')
  updateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
    this.userService.updateCategory(updateCategoryDto);
  }
}
