import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { PassThrough } from 'stream';
import { CreateUserDto } from './dto/createUserDto.dto';
import { UpdateUserDto } from './dto/updateUserDto.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
		const user = new User();
        user.email = createUserDto.email;
		user.firstName = createUserDto.firstName;
		user.lastName = createUserDto.lastName;
		user.username = createUserDto.username;
		user.password = createUserDto.password;
        return this.usersRepository.save(user);
    }

    findall(): Promise<User[]> {
        return this.usersRepository.find();
    }
    
    findOneById(id: number): Promise<User|null> {
        return this.usersRepository.findOneBy({ id });
    }
		
    update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = this.findOneById(id);
        return 
    }

    async delete(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}    
