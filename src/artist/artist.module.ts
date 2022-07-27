import { ArtistEntity } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  controllers: [ArtistController],
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
