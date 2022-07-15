import { TrackService } from './../track/track.service';
import { AlbumService } from './../album/album.service';
import { ERRORS } from './../types/Error';
import { v4 } from 'uuid';
import { ArtistEntity } from './entities/artist.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  private artists: ArtistEntity[] = [];

  create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = new ArtistEntity({
      id: v4(),
      ...createArtistDto,
    });

    this.artists.push(artist);

    return Promise.resolve(artist);
  }

  findAll(): Promise<ArtistEntity[]> {
    return Promise.resolve(this.artists);
  }

  findOne(id: string): Promise<ArtistEntity> {
    const artist = this.artists.find(({ id: artistId }) => artistId === id);

    if (!artist) throw new NotFoundException(ERRORS.NOT_FOUND);

    return Promise.resolve(artist);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Promise<ArtistEntity> {
    const artist = this.artists.find(({ id: artistId }) => artistId === id);

    if (!artist) throw new NotFoundException(ERRORS.NOT_FOUND);

    Object.assign(artist, updateArtistDto);

    return Promise.resolve(artist);
  }

  async remove(id: string): Promise<ArtistEntity> {
    const artist = this.artists.find(({ id: artistId }) => artistId === id);

    if (!artist) throw new NotFoundException(ERRORS.NOT_FOUND);

    this.artists = this.artists.filter(({ id: artistId }) => artistId !== id);

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
