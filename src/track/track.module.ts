import { FavouriteModule } from './../favourite/favourite.module';
import { Module, forwardRef } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController],
  imports: [forwardRef(() => FavouriteModule)],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
