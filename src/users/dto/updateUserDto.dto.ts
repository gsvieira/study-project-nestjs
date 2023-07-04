import { Optional } from "@nestjs/common";
import { IsEmail, IsString } from "class-validator";

export class UpdateUserDto {
    
    @IsEmail()
    email: string;
    @Optional()
    @IsString()
    firstName?: string;
    
    @Optional()
    @IsString()
    lastName?: string;
    
    @Optional()
    @IsString()
    username?: string;
    
    @Optional()
    @IsString()
    password?: string;
}
