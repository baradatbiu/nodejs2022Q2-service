import { AlbumEntity } from './../../album/entities/album.entity';
import { Artist } from './../interfaces/artist.interface';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TrackEntity } from 'src/track/entities/track.entity';

@Entity('artists')
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  album: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist)
  track: TrackEntity[];

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
