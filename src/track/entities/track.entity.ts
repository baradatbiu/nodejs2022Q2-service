import { AlbumEntity } from './../../album/entities/album.entity';
import { ArtistEntity } from './../../artist/entities/artist.entity';
import { Track } from './../interfaces/track.interface';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('track')
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => ArtistEntity)
  @JoinColumn()
  artist: [ArtistEntity];

  @OneToOne(() => AlbumEntity)
  @JoinColumn()
  album: [AlbumEntity];

  @Column()
  duration: number;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
