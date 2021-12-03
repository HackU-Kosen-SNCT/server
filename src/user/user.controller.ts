import { Controller, Patch } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Patch('/category')
  updateCategory() {
    return '';
  }
}
