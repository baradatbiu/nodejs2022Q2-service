import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavouriteService } from './favourite.service';

@Controller('favs')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.favouriteService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  async createTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favouriteService.create({ id, type: 'tracks' });
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favouriteService.remove({ id, type: 'tracks' });
  }

  @Post('album/:id')
  @HttpCode(201)
  async createAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favouriteService.create({ id, type: 'albums' });
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favouriteService.remove({ id, type: 'albums' });
  }

  @Post('artist/:id')
  @HttpCode(201)
  async createArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favouriteService.create({ id, type: 'artists' });
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favouriteService.remove({ id, type: 'artists' });
  }
}
