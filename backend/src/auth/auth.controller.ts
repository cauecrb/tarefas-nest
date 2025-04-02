import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

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
        //    async login(@Body('email') email: string, @Body('password') password: string) {
        //        return this.authService.login(email, password);
        async login(@Body() loginDto: { email: string; password: string }) {
            const user = await this.authService.validateUser(loginDto.email, loginDto.password);
            if (!user) {
                throw new UnauthorizedException('Credenciais inválidas');
            }
            return this.authService.login(user);
        } */

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }
}