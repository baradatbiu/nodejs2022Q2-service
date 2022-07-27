import { ArtistEntity } from './../artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { AlbumEntity } from './../album/entities/album.entity';
import { ArtistService } from './../artist/artist.service';
import { TrackService } from './../track/track.service';
import { AlbumService } from './../album/album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouriteEntity } from './entities/favourite.entity';
import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteController } from './favourite.controller';

@Module({
  controllers: [FavouriteController],
  imports: [
    TypeOrmModule.forFeature([FavouriteEntity]),
    TypeOrmModule.forFeature([ArtistEntity]),
    TypeOrmModule.forFeature([AlbumEntity]),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  providers: [FavouriteService, AlbumService, TrackService, ArtistService],
})
export class FavouriteModule {}
