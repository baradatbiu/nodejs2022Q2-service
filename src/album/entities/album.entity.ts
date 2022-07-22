import { ArtistEntity } from './../../artist/entities/artist.entity';
import { Album } from './../interfaces/album.interface';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackEntity } from 'src/track/entities/track.entity';

@Entity('albums')
export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string;

  @OneToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinColumn()
  artist: ArtistEntity;

  @OneToOne(() => TrackEntity)
  @JoinColumn()
  track: TrackEntity;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
