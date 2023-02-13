import { FavouriteEntity } from './../../favourite/entities/favourite.entity';
import { AlbumEntity } from './../../album/entities/album.entity';
import { ArtistEntity } from './../../artist/entities/artist.entity';
import { Track } from './../interfaces/track.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tracks')
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.album, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: ArtistEntity;

  @Column({ nullable: true })
  albumId: string;

  @ManyToOne(() => AlbumEntity, (album) => album.track, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  album: AlbumEntity;

  @ManyToOne(() => FavouriteEntity, (favourite) => favourite.tracks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  favourite: FavouriteEntity[];

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
