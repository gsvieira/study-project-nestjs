import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDTO } from '../dtos/sign-in.dto';
import { Public } from 'src/decorators/public.decorator';
import {
  ApiTags,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AccessTokenDTO } from '../dtos/access-token.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class Authcontroller {
  constructor(private readonly authService: AuthService) {}

  @ApiUnauthorizedResponse({ description: 'Senha incorreta' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado por email' })
  @Public()
  @Post('login')
  public async logIn(@Body() dto: SignInDTO): Promise<AccessTokenDTO> {
    return await this.authService.signIn(dto);
  }
}
