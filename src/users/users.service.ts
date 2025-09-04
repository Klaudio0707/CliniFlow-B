import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
 constructor(
  @InjectModel(UserEntity)
  private readonly userModel: typeof UserEntity,
 ) {}
   async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email } = createUserDto;

    // A verificação de e-mail duplicado
    const existingUser = await this.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException(`O e-mail ${email} já está em uso.`);
    }
    
    // Criação do usuário.
    const user = await this.userModel.create(createUserDto as any);
    // Remover a senha do objeto de retorno.
    const { password, ...result } = user.toJSON();
    return result as UserEntity;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userModel.findAll({
      attributes: { exclude: ['password'] }, 
    });
  }

  async findOne(id: string): Promise<UserEntity> { 
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new NotFoundException(`Utilizador com ID ${id} não encontrado.`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userModel.findByPk(id); 
    if (!user) {
      throw new NotFoundException(`Utilizador com ID ${id} não encontrado.`);
    }
    const updatedUser = await user.update(updateUserDto);
    const { password, ...result } = updatedUser.toJSON();
    return result as UserEntity;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id); 
    await user.destroy();
  }
}
