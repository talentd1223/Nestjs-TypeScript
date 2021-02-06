import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';
import PostsService from './posts.service';
import { CreatePostInput } from './inputs/post.input';
import { UseGuards } from '@nestjs/common';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { GraphqlJwtAuthGuard } from '../authentication/graphql-jwt-auth.guard';
import { User } from '../users/models/user.model';
import PostsLoaders from './loaders/posts.loaders';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private postsLoaders: PostsLoaders
  ) {}

  @Query(() => [Post])
  async posts() {
    const posts = await this.postsService.getPosts();
    return posts.items;
  }

  @ResolveField('author', () => User)
  async getAuthor(
    @Parent() post: Post
  ) {
    const { authorId } = post;

    return this.postsLoaders.batchAuthors.load(authorId);
  }

  @Mutation(() => Post)
  @UseGuards(GraphqlJwtAuthGuard)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @Context() context: { req: RequestWithUser },
  ) {
    return this.postsService.createPost(createPostInput, context.req.user);
  }
}