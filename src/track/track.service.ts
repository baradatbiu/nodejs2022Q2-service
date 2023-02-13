import { ERRORS } from './../types/Error';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const { affected } = await this.tracksRepository.delete(id);

    if (affected === 0) throw new NotFoundException(ERRORS.NOT_FOUND);
  }
}
