import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { log } from 'console';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    /*    @Post('register')
        async register(@Body('email') email: string, @Body('password') password: string) {
            return this.authService.register(email, password);
        } */
    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto); // Passar o DTO como único argumento
    }

    /*    @Post('login')
        async login(@Body() loginUserDto: LoginUserDto) {
            return this.authService.login(loginUserDto);
        } */

    @Post('login')
    async login(@Body() loginDto: LoginUserDto) {
        try {
            // Use the validateUser method to check credentials
            const user = await this.authService.validateUser(loginDto.email, loginDto.password);

            // If we get here, validation was successful
            return this.authService.login(user);
        } catch (error) {
            // The validateUser method will throw an exception if validation fails
            throw error;
        }
    }
}