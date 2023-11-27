import { UUID } from 'crypto';
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'Comments',
  modelName: 'Comment',
  timestamps: false,
})
export class Comment extends Model {
  @BelongsTo(() => User, 'userId')
  user?: User;
  @Column
  userId: UUID;
  @Column
  content: string;
  @Column
  parentId?: UUID;
  @Column
  creationDate?: Date;
  @Column
  fileUrl?: string;
}
