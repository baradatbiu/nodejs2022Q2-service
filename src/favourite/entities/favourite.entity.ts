import { Favourite } from './../interfaces/favourite.interface';

export class FavouriteEntity implements Favourite {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor(partial: Partial<FavouriteEntity>) {
    Object.assign(this, partial);
  }
}
