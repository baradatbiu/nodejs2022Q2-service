import { AlbumEntity } from './../../album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { ArtistEntity } from './../../artist/entities/artist.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('favourites')
export class FavouriteEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ArtistEntity, (artist) => artist.favourite, {
    createForeignKeyConstraints: false,
  })
  artists: ArtistEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.favourite, {
    createForeignKeyConstraints: false,
  })
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.favourite, {
    createForeignKeyConstraints: false,
  })
  tracks: TrackEntity[];

  constructor(partial: Partial<FavouriteEntity>) {
    Object.assign(this, partial);
  }
}
