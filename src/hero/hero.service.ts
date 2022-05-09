import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hero } from './hero.model';
import { Universe } from '../universe/universe.model';
import { FindHeroDto } from './dto/find-hero.dto';

@Injectable()
export class HeroService {
  constructor(
    @InjectModel(Hero)
    private readonly heroModel: typeof Hero,
  ) {}

  /**
   * Finds all heroes belonging to the given universe.
   */
  async find(dto: FindHeroDto): Promise<Hero[]> {
    const options = {
      attributes: ['id', 'name', 'hasCape'],
      where:
        dto.withCape !== undefined
          ? {
              hasCape: dto.withCape === 'true',
            }
          : {},
      include: [
        {
          model: Universe,
          attributes: [],
          where: {
            name: dto.universe,
          },
        },
      ],
    };
    return this.heroModel.findAll(options);
  }

  async create(
    id: number,
    name: string,
    hasCape: boolean,
    universe: Universe,
  ): Promise<Hero> {
    console.info(`Creating hero ${name} in ${universe.name}`);

    const hero = await Hero.create({
      id,
      name,
      hasCape,
      universe,
    });

    // Take care, this line MUST be placed AFTER .create(),
    // or the UPDATE will be performed before the insert.
    // I wasted 2 HOURS on that point.
    await universe.$add('heroes', [hero]);
    return hero;
  }
}
