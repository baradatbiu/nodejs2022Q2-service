import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AlbumEntity } from './album/entities/album.entity';
import { ArtistEntity } from './artist/entities/artist.entity';
import { UserEntity } from './user/entities/user.entity';
import { TrackEntity } from './track/entities/track.entity';

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
  entities: [UserEntity, ArtistEntity, AlbumEntity, TrackEntity],
  migrations: [__dirname + 'dist/migrations/**/*{.ts,.js}'],
});

export default connectionSource;
