import { IsInt, IsNotEmpty } from 'class-validator';

export class FindDTO {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
