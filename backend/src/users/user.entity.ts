import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}