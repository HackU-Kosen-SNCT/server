import { Body, Controller, NotFoundException, Patch } from '@nestjs/common';
import { UserCategoryPipe } from './user-category.pipe';
import { UpdateCategoryDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/category')
  async updateCategory(
    @Body(UserCategoryPipe)
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const user = await this.userService.updateCategory(updateCategoryDto);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
