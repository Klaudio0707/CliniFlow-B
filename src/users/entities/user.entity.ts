import { Table, Column, Model, PrimaryKey, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';


export enum AccessLevel {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Table({ tableName: 'users', timestamps: true })
export class UserEntity extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column(DataType.STRING)
  declare name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare role?: string; // Ex: "Recepcionista", "Médico", "Gerente"

  @Column({
    type: DataType.ENUM(...Object.values(AccessLevel)),
    defaultValue: AccessLevel.USER,
    allowNull: false,
  })
  declare accessLevel: AccessLevel;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: UserEntity) {
    if (instance.changed('password')) {
      const saltRounds = 10;
      instance.password = await bcrypt.hash(instance.password, saltRounds);
    }
  }
}