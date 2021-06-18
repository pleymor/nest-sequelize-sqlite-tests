import {
  CacheInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { FindHeroDto } from './dto/find-hero.dto';
import { Hero } from './hero.model';

@UseInterceptors(CacheInterceptor)
@Controller('heroes')
export class HeroController {
  constructor(private readonly service: HeroService) {}

  @Get()
  findHeroesWithCape(@Query() dto: FindHeroDto): Promise<Hero[]> {
    return this.service.findHeroesWithCape(dto.universe);
  }
}
