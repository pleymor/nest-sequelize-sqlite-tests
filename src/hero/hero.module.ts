import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Hero } from './hero.model';
import { UniverseModule } from '../universe/universe.module';

@Module({
  imports: [SequelizeModule.forFeature([Hero]), UniverseModule],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
