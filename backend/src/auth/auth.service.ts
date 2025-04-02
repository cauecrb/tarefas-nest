/*import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
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
        console.log('password:', password); // Log do DTO recebido
        //console.log('user.password:', user.password);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            //console.log('user.password:', user.password);
            throw new UnauthorizedException('Credenciais inválidas 2');
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
} */

// src/auth/auth.service.ts
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    // Registro de usuário
    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const { name, email, password, confirmPassword } = registerUserDto;

        // Verificar se as senhas coincidem
        if (password !== confirmPassword) {
            throw new ConflictException('As senhas não coincidem');
        }

        // Verificar se o usuário já existe
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email já cadastrado');
        }

        // Criptografar senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar e salvar usuário
        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return this.userRepository.save(user);
    }

    // Validação de login
    async validateUser(email: string, password: string): Promise<User> {
        console.log('Attempting to validate user with email:', email);

        try {
            const user = await this.userRepository.findOne({ where: { email } });

            console.log('Database query result:', user ? 'User found' : 'User not found');

            if (!user) {
                console.log('User not found in database');
                throw new UnauthorizedException('User not found');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Password validation result:', isPasswordValid ? 'Valid' : 'Invalid');

            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid password');
            }

            return user;
        } catch (error) {
            console.error('Error in validateUser:', error);
            throw error;
        }
    }

    // Geração do token JWT
    async login(user: User): Promise<{ accessToken: string }> {
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}