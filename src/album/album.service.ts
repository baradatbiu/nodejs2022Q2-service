import { ArtistService } from './../artist/artist.service';
import { FavouriteService } from './../favourite/favourite.service';
import { TrackService } from './../track/track.service';
import { ERRORS } from './../types/Error';
import { v4 } from 'uuid';
import { AlbumEntity } from './entities/album.entity';
import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => FavouriteService))
    private readonly favouriteService: FavouriteService,
  ) {}

  private static albums: AlbumEntity[] = [];

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    if (createAlbumDto.artistId) {
      try {
        await this.artistService.findOne(createAlbumDto.artistId);
      } catch (error) {
        if (error.status === 404)
          throw new UnprocessableEntityException(ERRORS.NOT_FOUND);

        throw error;
      }
    }

    const album = new AlbumEntity({
      id: v4(),
      ...createAlbumDto,
    });

    AlbumService.albums.push(album);

    return Promise.resolve(album);
  }

  findAll(): Promise<AlbumEntity[]> {
    return Promise.resolve(AlbumService.albums);
  }

  findOne(id: string): Promise<AlbumEntity> {
    const album = AlbumService.albums.find(({ id: albumId }) => albumId === id);

    if (!album) throw new NotFoundException(ERRORS.NOT_FOUND);

    return Promise.resolve(album);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<AlbumEntity> {
    const album = AlbumService.albums.find(({ id: albumId }) => albumId === id);

    if (!album) throw new NotFoundException(ERRORS.NOT_FOUND);

    Object.assign(album, updateAlbumDto);

    return Promise.resolve(album);
  }

  async remove(id: string): Promise<AlbumEntity> {
    const album = AlbumService.albums.find(({ id: albumId }) => albumId === id);

    if (!album) throw new NotFoundException(ERRORS.NOT_FOUND);

    await this.favouriteService.remove({ id, type: 'albums' });

    AlbumService.albums = AlbumService.albums.filter(
      ({ id: albumId }) => albumId !== id,
    );

    const tracks = await this.trackService.findAll();

    const foundTrack = tracks.find(({ albumId }) => albumId === id);

    if (foundTrack) {
      await this.trackService.update(foundTrack.id, { albumId: null });
    }

    return Promise.resolve(album);
  }
}
