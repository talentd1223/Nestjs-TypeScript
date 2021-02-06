import * as DataLoader from 'dataloader';
import User from '../../users/user.entity';

export interface GraphQLContext {
  batchPostAuthors: DataLoader<number, User[]>;
}