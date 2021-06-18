import { CacheModule, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Hero } from './hero.model';
import { Universe } from './universe.model';

@Module({
  imports: [
    CacheModule.register({
      ttl: 30, // seconds
      max: 10000, // maximum number of items in cache
    }),
    SequelizeModule.forFeature([Hero, Universe]),
  ],
  providers: [HeroService],
  controllers: [HeroController],
})
export class HeroModule {}
