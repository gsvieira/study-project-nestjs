import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(dto: CreateUserDTO): Promise<User> {
    const user: User = this.repository.create(dto);

    return this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<User> {
    const user: User | null = await this.repository.findOne({
      where: { id },
    });

    if (!user || !id) {
      throw new NotFoundException(`Usuário nâo encontrado pelo ID: ${id}`);
    }

    return user;
  }
  async findByEmail(email: string): Promise<User> {
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

  async update(id: number, dto: UpdateUserDTO): Promise<User> {
    let user: User = await this.findById(id);

    user = this.repository.merge(user, dto);

    return this.repository.save(user);
  }

  async delete(id: number): Promise<void> {
    const user: User = await this.findById(id);

    await this.repository.remove(user);
  }
}
