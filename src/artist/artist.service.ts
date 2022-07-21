import { ERRORS } from './../types/Error';
import { ArtistEntity } from './entities/artist.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = this.artistsRepository.create({
      ...createArtistDto,
    });

    return await this.artistsRepository.save(artist);
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistsRepository.find();
  }

  async findOne(id: string): Promise<ArtistEntity> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) throw new NotFoundException(ERRORS.NOT_FOUND);

    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) throw new NotFoundException(ERRORS.NOT_FOUND);

    Object.assign(artist, updateArtistDto);

    return await this.artistsRepository.save(artist);
  }

  async remove(id: string): Promise<void> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) throw new NotFoundException(ERRORS.NOT_FOUND);

    // const { artists } = await this.favouriteService.findAll();
    // const hasInFavourites = artists.some(({ id: trackId }) => trackId === id);

    // if (hasInFavourites) {
    //   await this.favouriteService.remove({ id, type: 'artists' });
    // }

    // const albums = await this.albumService.findAll();
    // const tracks = await this.trackService.findAll();

    // const foundAlbum = albums.find(({ artistId }) => artistId === id);
    // const foundTrack = tracks.find(({ artistId }) => artistId === id);

    // if (foundAlbum) {
    //   await this.albumService.update(foundAlbum.id, { artistId: null });
    // }

    // if (foundTrack) {
    //   await this.trackService.update(foundTrack.id, { artistId: null });
    // }
  }
}
