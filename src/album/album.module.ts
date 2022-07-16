import { ArtistModule } from './../artist/artist.module';
import { FavouriteModule } from './../favourite/favourite.module';
import { FavouriteService } from './../favourite/favourite.service';
import { TrackService } from './../track/track.service';
import { Module, forwardRef } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  controllers: [AlbumController],
  imports: [forwardRef(() => FavouriteModule), forwardRef(() => ArtistModule)],
  providers: [AlbumService, TrackService, FavouriteService],
  exports: [AlbumService],
})
export class AlbumModule {}
