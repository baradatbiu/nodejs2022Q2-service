import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackEntity } from './entities/track.entity';

@Module({
  controllers: [TrackController],
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
