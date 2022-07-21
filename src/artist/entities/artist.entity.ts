import { Artist } from './../interfaces/artist.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
