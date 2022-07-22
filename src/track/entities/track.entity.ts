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

  @OneToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinColumn()
  artist: ArtistEntity;

  @Column({ nullable: true })
  albumId: string;

  @OneToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  @JoinColumn()
  album: AlbumEntity;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
