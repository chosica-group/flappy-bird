import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  ForeignKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme'
})
class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme: string;

  @Column(DataType.STRING)
  device: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id'
  })
  ownerId: string;
} 
