import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';


// O UsersModule é responsável por gerenciar as operações relacionadas a usuários.
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }