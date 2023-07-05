import { Optional } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @Optional()
  @IsNotEmpty()
  firstName?: string;

  @Optional()
  @IsNotEmpty()
  lastName?: string;

  @Optional()
  @IsNotEmpty()
  username?: string;

  @Optional()
  @IsNotEmpty()
  password?: string;
}
