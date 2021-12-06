import { Body, Controller, NotFoundException, Patch } from '@nestjs/common';
import { UserCategoryPipe } from './user-category.pipe';
import { UserCategory } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/category')
  async updateCategory(
    @Body() registrant: string,
    @Body('searching_category', UserCategoryPipe)
    searching_category: UserCategory,
  ) {
    const user = await this.userService.updateCategory({
      registrant,
      searching_category,
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
