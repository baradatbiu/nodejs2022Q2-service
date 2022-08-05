import { CustomExceptionFilter } from './logger/custom-exception.filter';
import { LoggerMiddleware } from './middleware/logger';
import { LoggerModule } from './logger/logger.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavouriteModule } from './favourite/favourite.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { options } from './database/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => options as TypeOrmModuleAsyncOptions,
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavouriteModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
