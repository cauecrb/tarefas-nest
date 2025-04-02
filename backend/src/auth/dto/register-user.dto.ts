import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @Matches('password')
    confirmPassword: string;
}