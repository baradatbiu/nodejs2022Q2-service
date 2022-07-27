import { AlbumModule } from './../album/album.module';
import { ArtistModule } from './../artist/artist.module';
import { FavouriteModule } from './../favourite/favourite.module';
import { Module, forwardRef } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController],
  imports: [
    forwardRef(() => FavouriteModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
  ],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
