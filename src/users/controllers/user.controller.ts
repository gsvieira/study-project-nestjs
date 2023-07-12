import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { Public } from '../../decorators/public.decorator';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FindDTO } from '../dtos/find.dto';
import { UserResponseDTO } from '../dtos/user-response.dto';

@ApiTags('Usuário')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiCreatedResponse({
    description: 'O usuário foi criado com sucesso;',
    type: UserResponseDTO,
  })
  @Public()
  @Post()
  public async create(@Body() dto: CreateUserDTO): Promise<User> {
    return this.usersService.create(dto);
  }

  @ApiOkResponse({
    description: 'Retorna usuários do sistema',
    type: UserResponseDTO,
    isArray: true,
  })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Public()
  @Get()
  public async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOkResponse({ type: UserResponseDTO })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiBearerAuth()
  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) dto: FindDTO): Promise<User> {
    return this.usersService.findById(dto.id);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiBearerAuth()
  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOkResponse({ description: 'Usuário deletado com sucesso.' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiBearerAuth()
  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
