import { Controller, Get, Query } from '@nestjs/common';
import { HeroService } from './hero.service';
import { FindHeroDto } from './dto/find-hero.dto';
import { Hero } from './hero.model';

@Controller('heroes')
export class HeroController {
  constructor(private readonly service: HeroService) {}

  @Get()
  find(@Query() dto: FindHeroDto): Promise<Hero[]> {
    return this.service.find(dto);
  }
}
