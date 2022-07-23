import { AlbumEntity } from './../album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { ArtistEntity } from './../artist/entities/artist.entity';
import { ERRORS } from './../types/Error';
import { FavouriteEntity } from './entities/favourite.entity';
import { Entity } from './../types/Favourite';
import {
  Injectable,
  UnprocessableEntityException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(FavouriteEntity)
    private favouritesRepository: Repository<FavouriteEntity>,
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {
    this.init();
  }

  async init() {
    const alreadyExist = await this.favouritesRepository.find();

    if (alreadyExist.length) return;

    await this.favouritesRepository.save({});
  }

  async findAll() {
    const [favourite] = await this.favouritesRepository.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    return favourite;
  }

  async create({ id, type }: { id: string; type: Entity }) {
    const relations = {};
    relations[type] = true;

    const [favourite] = await this.favouritesRepository.find({ relations });

    const alreadyExist = favourite[type].some(
      ({ id: entityId }) => entityId === id,
    );

    if (alreadyExist) throw new BadRequestException(ERRORS.ALREADY_EXIST);

    const currentRepository = `${type}Repository`;

    const artist = await this[currentRepository].findOneBy({ id });

    if (!artist) throw new UnprocessableEntityException(ERRORS.NOT_FOUND);

    Object.assign(artist, { favourite });

    await this[currentRepository].save(artist);

    return Promise.resolve('Added successfully');
  }

  async remove({ id, type }: { id: string; type: Entity }) {
    const relations = {};
    relations[type] = true;

    const [favourite] = await this.favouritesRepository.find({ relations });

    const notExist = !favourite[type].some(
      ({ id: entityId }) => entityId === id,
    );

    if (notExist) throw new NotFoundException(ERRORS.NOT_FOUND);

    switch (type) {
      case 'tracks':
        favourite[type] = favourite.tracks.filter(
          ({ id: entityId }) => entityId !== id,
        );
        break;
      case 'albums':
        favourite[type] = favourite.albums.filter(
          ({ id: entityId }) => entityId !== id,
        );
        break;
      case 'artists':
        favourite[type] = favourite.artists.filter(
          ({ id: entityId }) => entityId !== id,
        );
        break;
    }

    await this.favouritesRepository.save(favourite);
  }
}
