import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';
import PostsService from './posts.service';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @Query(() => [Post])
  async posts() {
    const posts = await this.postsService.getPosts();
    return posts.items;
  }

  @ResolveField('author', () => User)
  async getAuthor(@Parent() post: Post) {
    const { authorId } = post;

    return this.usersService.getById(authorId);
  }

  // ...
}