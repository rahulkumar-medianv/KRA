import { ConfigService } from '@nestjs/config';

import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entities/auth.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
export const datababseConfig: TypeOrmModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [UserEntity, ProductEntity],
        autoLoadEntities: true,
        synchronize: true,
       
    })
}