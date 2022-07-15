import { ERRORS } from './../types/Error';
import { v4 } from 'uuid';
import { AlbumEntity } from './entities/album.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private albums: AlbumEntity[] = [];

  create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const album = new AlbumEntity({
      id: v4(),
      ...createAlbumDto,
    });

    this.albums.push(album);

    return Promise.resolve(album);
  }

  findAll(): Promise<AlbumEntity[]> {
    return Promise.resolve(this.albums);
  }

  findOne(id: string): Promise<AlbumEntity> {
    const album = this.albums.find(({ id: albumId }) => albumId === id);

    if (!album) throw new NotFoundException(ERRORS.NOT_FOUND);

    return Promise.resolve(album);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<AlbumEntity> {
    const album = this.albums.find(({ id: albumId }) => albumId === id);

    if (!album) throw new NotFoundException(ERRORS.NOT_FOUND);

    Object.assign(album, updateAlbumDto);

    return Promise.resolve(album);
  }

  remove(id: string): Promise<AlbumEntity> {
    const album = this.albums.find(({ id: albumId }) => albumId === id);

    if (!album) throw new NotFoundException(ERRORS.NOT_FOUND);

    this.albums = this.albums.filter(({ id: albumId }) => albumId !== id);

    return Promise.resolve(album);
  }
}
