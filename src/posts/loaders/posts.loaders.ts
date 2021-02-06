import { Injectable, Scope } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import * as DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export default class PostsLoaders {
  constructor(
    private usersService: UsersService,
  ) {
  }

  public readonly batchAuthors = new DataLoader((authorIds: number[]) => {
    return this.usersService.getByIds(authorIds);
  })
}