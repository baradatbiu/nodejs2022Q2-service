import { AlbumEntity } from './../../album/entities/album.entity';
import { Artist } from './../interfaces/artist.interface';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artists')
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToOne(() => AlbumEntity)
  @JoinColumn()
  album: AlbumEntity;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
