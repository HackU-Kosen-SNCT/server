import { Body, Controller, NotFoundException, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UserCategoryPipe } from './user-category.pipe';
import { UpdateCategoryDto, UpdateCategoryResponse } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/category')
  @ApiOperation({ summary: 'ユーザーの探しているもののカテゴリを変更するAPI' })
  @ApiParam({
    name: 'registrant',
    required: true,
    description: 'ユーザーのID',
  })
  @ApiParam({
    name: 'searching_category',
    required: true,
    description: 'ユーザーが登録できるカテゴリ',
  })
  @ApiOkResponse({
    description: '成功時処理',
    type: UpdateCategoryResponse,
  })
  @ApiBadRequestResponse({
    description: 'searching_categoryの値が適切ではない場合に返されます',
  })
  @ApiNotFoundResponse({
    description: 'registrantの値が適切ではない(存在しない場合に返されます)',
  })
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
