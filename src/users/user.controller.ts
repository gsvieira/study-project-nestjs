import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUserDto.dto";
import { UpdateUserDto } from "./dto/updateUserDto.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { error } from "console";


@Controller('user')
export class UserController{
    constructor(private readonly usersService: UserService) {}
    
    @Post()
    create(@Body(new ValidationPipe()) createUserDto : CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto)
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findall()
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        const user = this.usersService.findOneById(+id);
        if (user) {
            return user;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body(new ValidationPipe())updateUserDto: UpdateUserDto) {
        const user = this.findOne(id);
        if (user){
            return this.usersService.update(+id, updateUserDto);
        }
    }

    @Delete(':id')
    delete(@Param('id') id:string): Promise<void> {
        const user = this.findOne(id);
        if (user){
            return this.usersService.delete(+id);
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
}