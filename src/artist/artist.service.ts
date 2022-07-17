import { FavouriteService } from './../favourite/favourite.service';
import { TrackService } from './../track/track.service';
import { AlbumService } from './../album/album.service';
import { ERRORS } from './../types/Error';
import { v4 } from 'uuid';
import { ArtistEntity } from './entities/artist.entity';
import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavouriteService))
    private readonly favouriteService: FavouriteService,
  ) {}

  private static artists: ArtistEntity[] = [];

  create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = new ArtistEntity({
      id: v4(),
      ...createArtistDto,
    });

    ArtistService.artists.push(artist);

    return Promise.resolve(artist);
  }

  findAll(): Promise<ArtistEntity[]> {
    return Promise.resolve(ArtistService.artists);
  }

  findOne(id: string): Promise<ArtistEntity> {
    const artist = ArtistService.artists.find(
      ({ id: artistId }) => artistId === id,
    );

    if (!artist) throw new NotFoundException(ERRORS.NOT_FOUND);

    return Promise.resolve(artist);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Promise<ArtistEntity> {
    const artist = ArtistService.artists.find(
      ({ id: artistId }) => artistId === id,
    );

    if (!artist) throw new NotFoundException(ERRORS.NOT_FOUND);

    Object.assign(artist, updateArtistDto);

    return Promise.resolve(artist);
  }

  async remove(id: string): Promise<ArtistEntity> {
    const artist = ArtistService.artists.find(
      ({ id: artistId }) => artistId === id,
    );

    if (!artist) throw new NotFoundException(ERRORS.NOT_FOUND);

    const { artists } = await this.favouriteService.findAll();
    const hasInFavourites = artists.some(({ id: trackId }) => trackId === id);

    if (hasInFavourites) {
      await this.favouriteService.remove({ id, type: 'artists' });
    }

    ArtistService.artists = ArtistService.artists.filter(
      ({ id: artistId }) => artistId !== id,
    );

    const albums = await this.albumService.findAll();
    const tracks = await this.trackService.findAll();

    const foundAlbum = albums.find(({ artistId }) => artistId === id);
    const foundTrack = tracks.find(({ artistId }) => artistId === id);

    if (foundAlbum) {
      await this.albumService.update(foundAlbum.id, { artistId: null });
    }

    if (foundTrack) {
      await this.trackService.update(foundTrack.id, { artistId: null });
    }

    return Promise.resolve(artist);
  }
}
