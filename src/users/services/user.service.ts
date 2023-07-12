import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  public async create(dto: CreateUserDTO): Promise<User> {
    try {
      await this.findByEmail(dto.email);
    } catch (e) {
      if (e instanceof NotFoundException) {
        const user: User = this.repository.create(dto);
        return this.repository.save(user);
      }
    }
    throw new BadRequestException('Usuário já existe');
  }

  public async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  public async findById(id: number): Promise<User> {
    const user: User | null = await this.repository.findOne({
      where: { id },
    });

    if (!user || !id) {
      throw new NotFoundException(`Usuário nâo encontrado pelo ID: ${id}`);
    }

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user: User | null = await this.repository.findOne({
      where: { email },
    });
    if (!user || !email) {
      throw new NotFoundException(
        `Usuário não encontrado pelo Email: ${email}`,
      );
    }
    return user;
  }

  public async update(id: number, dto: UpdateUserDTO): Promise<User> {
    let user: User = await this.findById(id);

    user = this.repository.merge(user, dto);
    console.log(user);
    return this.repository.save(user);
  }

  public async delete(id: number): Promise<void> {
    const user: User = await this.findById(id);

    await this.repository.remove(user);
  }
}
