// src/typeorm.config.ts
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

//const dbport = parseInt(configService.get('DB_PORT') || 5432);
export const typeOrmConfig = async (
    configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get<string>('DB_PORT'),
    //port: 5432,
    username: configService.get('DB_USER'), // Use DB_USER aqui
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // Caminho dinâmico
    synchronize: true,
    ssl: {
        rejectUnauthorized: false, // Para desenvolvimento
    }, // Adicione se estiver usando SSL localmente
});
