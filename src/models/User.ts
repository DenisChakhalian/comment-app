import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Users',
  modelName: 'User',
  timestamps: false,
})
export class User extends Model {
  @Column
  username: string;
  @Column
  email: string;
  @Column
  homepage?: string;
}
