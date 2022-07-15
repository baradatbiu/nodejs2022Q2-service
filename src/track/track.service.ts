import { ERRORS } from './../types/Error';
import { v4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  private tracks: TrackEntity[] = [];

  create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const track = new TrackEntity({
      id: v4(),
      ...createTrackDto,
    });

    this.tracks.push(track);

    return Promise.resolve(track);
  }

  findAll(): Promise<TrackEntity[]> {
    return Promise.resolve(this.tracks);
  }

  findOne(id: string): Promise<TrackEntity> {
    const track = this.tracks.find(({ id: trackId }) => trackId === id);

    if (!track) throw new NotFoundException(ERRORS.NOT_FOUND);

    return Promise.resolve(track);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Promise<TrackEntity> {
    const track = this.tracks.find(({ id: trackId }) => trackId === id);

    if (!track) throw new NotFoundException(ERRORS.NOT_FOUND);

    Object.assign(track, updateTrackDto);

    return Promise.resolve(track);
  }

  remove(id: string): Promise<TrackEntity> {
    const track = this.tracks.find(({ id: trackId }) => trackId === id);

    if (!track) throw new NotFoundException(ERRORS.NOT_FOUND);

    this.tracks = this.tracks.filter(({ id: trackId }) => trackId !== id);

    return Promise.resolve(track);
  }
}
