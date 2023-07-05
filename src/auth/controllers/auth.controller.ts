import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDTO } from '../dtos/sign-in.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class Authcontroller {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  public logIn(@Body() dto: SignInDTO): Promise<void> {
    return this.authService.signIn(dto);
  }
}
