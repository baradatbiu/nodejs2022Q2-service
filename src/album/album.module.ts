import { FavouriteModule } from './../favourite/favourite.module';
import { AlbumEntity } from './entities/album.entity';
import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AlbumController],
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
