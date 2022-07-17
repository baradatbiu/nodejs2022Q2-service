import { AlbumService } from './../album/album.service';
import { ArtistService } from './../artist/artist.service';
import { FavouriteService } from './../favourite/favourite.service';
import { ERRORS } from './../types/Error';
import { v4 } from 'uuid';
import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => FavouriteService))
    private readonly favouriteService: FavouriteService,
  ) {}

  private static tracks: TrackEntity[] = [];

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    if (createTrackDto.artistId) {
      try {
        await this.artistService.findOne(createTrackDto.artistId);
      } catch (error) {
        if (error.status === 404)
          throw new UnprocessableEntityException(ERRORS.NOT_FOUND);

        throw error;
      }
    }

    if (createTrackDto.albumId) {
      try {
        await this.albumService.findOne(createTrackDto.albumId);
      } catch (error) {
        if (error.status === 404)
          throw new UnprocessableEntityException(ERRORS.NOT_FOUND);

        throw error;
      }
    }

    const track = new TrackEntity({
      id: v4(),
      ...createTrackDto,
    });

    TrackService.tracks.push(track);

    return Promise.resolve(track);
  }

  findAll(): Promise<TrackEntity[]> {
    return Promise.resolve(TrackService.tracks);
  }

  findOne(id: string): Promise<TrackEntity> {
    const track = TrackService.tracks.find(({ id: trackId }) => trackId === id);

    if (!track) throw new NotFoundException(ERRORS.NOT_FOUND);

    return Promise.resolve(track);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Promise<TrackEntity> {
    const track = TrackService.tracks.find(({ id: trackId }) => trackId === id);

    if (!track) throw new NotFoundException(ERRORS.NOT_FOUND);

    Object.assign(track, updateTrackDto);

    return Promise.resolve(track);
  }

  async remove(id: string): Promise<TrackEntity> {
    const track = TrackService.tracks.find(({ id: trackId }) => trackId === id);

    if (!track) throw new NotFoundException(ERRORS.NOT_FOUND);

    const { tracks } = await this.favouriteService.findAll();
    const hasInFavourites = tracks.some(({ id: trackId }) => trackId === id);

    if (hasInFavourites) {
      await this.favouriteService.remove({ id, type: 'tracks' });
    }

    TrackService.tracks = TrackService.tracks.filter(
      ({ id: trackId }) => trackId !== id,
    );

    return Promise.resolve(track);
  }
}
