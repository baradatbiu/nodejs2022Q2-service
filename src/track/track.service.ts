import { ERRORS } from './../types/Error';
import {
  Injectable,
  NotFoundException,
  // UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    // if (createTrackDto.artistId) {
    //   try {
    //     await this.artistService.findOne(createTrackDto.artistId);
    //   } catch (error) {
    //     if (error.status === 404)
    //       throw new UnprocessableEntityException(ERRORS.NOT_FOUND);

    //     throw error;
    //   }
    // }

    // if (createTrackDto.albumId) {
    //   try {
    //     await this.albumService.findOne(createTrackDto.albumId);
    //   } catch (error) {
    //     if (error.status === 404)
    //       throw new UnprocessableEntityException(ERRORS.NOT_FOUND);

    //     throw error;
    //   }
    // }

    const track = this.tracksRepository.create({
      ...createTrackDto,
    });

    return await this.tracksRepository.save(track);
  }

  async findAll(): Promise<TrackEntity[]> {
    return await this.tracksRepository.find();
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) throw new NotFoundException(ERRORS.NOT_FOUND);

    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) throw new NotFoundException(ERRORS.NOT_FOUND);

    Object.assign(track, updateTrackDto);

    return await this.tracksRepository.save(track);
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.tracksRepository.delete({ id });

    if (affected === 0) throw new NotFoundException(ERRORS.NOT_FOUND);

    // const { tracks } = await this.favouriteService.findAll();
    // const hasInFavourites = tracks.some(({ id: trackId }) => trackId === id);

    // if (hasInFavourites) {
    //   await this.favouriteService.remove({ id, type: 'tracks' });
    // }
  }
}
