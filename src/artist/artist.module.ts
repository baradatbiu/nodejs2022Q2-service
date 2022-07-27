import { AlbumModule } from './../album/album.module';
import { FavouriteModule } from './../favourite/favourite.module';
import { FavouriteService } from './../favourite/favourite.service';
import { TrackService } from './../track/track.service';
import { AlbumService } from './../album/album.service';
import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  controllers: [ArtistController],
  imports: [forwardRef(() => FavouriteModule), forwardRef(() => AlbumModule)],
  providers: [ArtistService, AlbumService, TrackService, FavouriteService],
  exports: [ArtistService],
})
export class ArtistModule {}
