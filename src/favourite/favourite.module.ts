import { ArtistService } from './../artist/artist.service';
import { TrackService } from './../track/track.service';
import { AlbumService } from './../album/album.service';
import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteController } from './favourite.controller';

@Module({
  controllers: [FavouriteController],
  providers: [FavouriteService, AlbumService, TrackService, ArtistService],
  exports: [FavouriteService],
})
export class FavouriteModule {}
