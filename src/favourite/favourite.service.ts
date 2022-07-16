import { ERRORS } from './../types/Error';
import { ArtistService } from './../artist/artist.service';
import { TrackService } from './../track/track.service';
import { AlbumService } from './../album/album.service';
import { FavouriteEntity } from './entities/favourite.entity';
import { Entity } from './../types/Favourite';
import {
  Injectable,
  forwardRef,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class FavouriteService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  private static favourites: FavouriteEntity = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async findAll() {
    const albums = await Promise.all(
      FavouriteService.favourites.albums.map((id) =>
        this.albumService.findOne(id),
      ),
    );
    const tracks = await Promise.all(
      FavouriteService.favourites.tracks.map((id) =>
        this.trackService.findOne(id),
      ),
    );
    const artists = await Promise.all(
      FavouriteService.favourites.artists.map((id) =>
        this.artistService.findOne(id),
      ),
    );

    return { artists, albums, tracks };
  }

  async create({ id, type }: { id: string; type: Entity }) {
    const currentEntityArray = FavouriteService.favourites[type];
    const currentService = `${type.slice(0, -1)}Service`;

    try {
      await this[currentService].findOne(id);
    } catch (error) {
      if (error.status === 404)
        throw new UnprocessableEntityException(ERRORS.NOT_FOUND);

      throw error;
    }

    currentEntityArray.push(id);

    return Promise.resolve();
  }

  async remove({ id, type }: { id: string; type: Entity }) {
    const currentEntityArray = FavouriteService.favourites[type];
    const currentService = `${type.slice(0, -1)}Service`;

    await this[currentService].findOne(id);

    FavouriteService.favourites[type] = currentEntityArray.filter(
      (entityId) => entityId !== id,
    );

    return Promise.resolve();
  }
}
