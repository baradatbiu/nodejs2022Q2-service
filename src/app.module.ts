import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
// import { FavouriteModule } from './favourite/favourite.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AlbumEntity } from './album/entities/album.entity';
import { ArtistEntity } from './artist/entities/artist.entity';
import { UserEntity } from './user/entities/user.entity';
import { TrackEntity } from './track/entities/track.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
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
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      }),
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    // FavouriteModule,
  ],
})
export class AppModule {}
