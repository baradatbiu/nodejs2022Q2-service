import { ArtistEntity } from './../../artist/entities/artist.entity';
import { Album } from './../interfaces/album.interface';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @OneToOne(() => ArtistEntity)
  @JoinColumn()
  artist: [ArtistEntity];

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
