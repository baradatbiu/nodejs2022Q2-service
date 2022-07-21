import { ERRORS } from './../types/Error';
import { AlbumEntity } from './entities/album.entity';
import {
  Injectable,
  NotFoundException,
  // UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    // if (createAlbumDto.artistId) {
    //   try {
    //     await this.artistService.findOne(createAlbumDto.artistId);
    //   } catch (error) {
    //     if (error.status === 404)
    //       throw new UnprocessableEntityException(ERRORS.NOT_FOUND);

    //     throw error;
    //   }
    // }

    const album = this.albumsRepository.create({
      ...createAlbumDto,
    });

    return await this.albumsRepository.save(album);
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumsRepository.find();
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) throw new NotFoundException(ERRORS.NOT_FOUND);

    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) throw new NotFoundException(ERRORS.NOT_FOUND);

    Object.assign(album, updateAlbumDto);

    return await this.albumsRepository.save(album);
  }

  async remove(id: string): Promise<void> {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) throw new NotFoundException(ERRORS.NOT_FOUND);

    // const { albums } = await this.favouriteService.findAll();
    // const hasInFavourites = albums.some(({ id: trackId }) => trackId === id);

    // if (hasInFavourites) {
    //   await this.favouriteService.remove({ id, type: 'albums' });
    // }

    // AlbumService.albums = AlbumService.albums.filter(
    //   ({ id: albumId }) => albumId !== id,
    // );

    // const tracks = await this.trackService.findAll();

    // const foundTrack = tracks.find(({ albumId }) => albumId === id);

    // if (foundTrack) {
    //   await this.trackService.update(foundTrack.id, { albumId: null });
    // }
  }
}
