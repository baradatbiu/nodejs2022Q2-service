import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

const connectionSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: +configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
  logging: configService.get<boolean>('TYPEORM_LOGGING'),
  migrationsRun: configService.get<boolean>('TYPEORM_MIGRATIONS_RUN'),
  migrationsTableName: configService.get<string>(
    'TYPEORM_MIGRATIONS_TABLE_NAME',
  ),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});

export default connectionSource;
