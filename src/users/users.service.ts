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

    // 1. A verificação de e-mail duplicado continua igual e é muito importante.
    const existingUser = await this.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException(`O e-mail ${email} já está em uso.`);
    }
    
    // 2. Criação do usuário.
    const user = await this.userModel.create(createUserDto as any);
    // 3. Remover a senha do objeto de retorno.
    const { password, ...result } = user.toJSON();
    return result as UserEntity;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userModel.findAll({
      attributes: { exclude: ['password'] }, // Ótima prática de segurança!
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
    const user = await this.findOne(id); 
    await user.update(updateUserDto);
    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id); 
    await user.destroy();
  }
}
