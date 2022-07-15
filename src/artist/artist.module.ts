import { TrackService } from './../track/track.service';
import { AlbumService } from './../album/album.service';
import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  imports: [AlbumService, TrackService],
  controllers: [ArtistController],
  providers: [ArtistService, AlbumService, TrackService],
  exports: [ArtistService],
})
export class ArtistModule {}
