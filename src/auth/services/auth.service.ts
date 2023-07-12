import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { SignInDTO } from '../dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDTO } from '../dtos/access-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDTO): Promise<AccessTokenDTO> {
    const user = await this.userService.findByEmail(dto.email);
    if (user.password !== dto.password) {
      throw new UnauthorizedException(`Senha incorreta.`);
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
