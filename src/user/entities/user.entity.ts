import { Table, Column, PrimaryKey, DataType} from 'sequelize-typescript';

@Table({ tableName: 'user', timestamps: true })

export class User {
    @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

 @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;
}
