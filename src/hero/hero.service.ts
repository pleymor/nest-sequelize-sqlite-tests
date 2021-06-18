import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hero } from './hero.model';
import { Universe } from './universe.model';

@Injectable()
export class HeroService {
  constructor(
    @InjectModel(Hero)
    private readonly heroModel: typeof Hero,
  ) {}

  /**
   * Finds all heroes belonging to the given universe, and who have a cape.
   * @param universeName
   */
  async findHeroesWithCape(universeName: string): Promise<Hero[]> {
    return this.heroModel.findAll({
      where: {
        hasCape: true,
      },
      include: [
        {
          model: Universe,
          where: {
            name: universeName,
          },
        },
      ],
    });
  }
}
