import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export default class PostsLoaders {
  constructor(
    private usersService: UsersService,
  ) {
  }

  batchAuthors = (authorIds: number[]): Promise<any> => {
    return this.usersService.getByIds(authorIds);
  }
}