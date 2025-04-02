/*import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersService.create({ email, password: hashedPassword });
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Credenciais inválidas!');
        }
        const payload = { sub: user.id, email: user.email };
        return { access_token: this.jwtService.sign(payload) };
    }
} */

import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && (await user.validatePassword(password))) {
            return user;
        }

        return null;
    }

    async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
        const { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };

    }

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const { name, email, password, confirmPassword } = registerUserDto;

        if (password !== confirmPassword) {
            throw new BadRequestException('As senhas não coincidem');
        }

        // Verificar se o usuário já existe
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email já cadastrado');
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);
        // Criar usuário
        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return this.userRepository.save(user);
    }
}