import { Universe } from '../../hero/universe.model';
import { Hero } from '../../hero/hero.model';

async function createUniverse(id: number, name: string): Promise<Universe> {
  const universe = Universe.build();
  universe.id = id;
  universe.name = name;
  return universe.save();
}

async function createHero(
  id: number,
  name: string,
  hasCape: boolean,
  universe: Universe,
): Promise<Hero> {
  const hero = new Hero();
  hero.id = id;
  hero.name = name;
  hero.hasCape = hasCape;
  hero.universe = universe;
  await hero.save();

  // Take care, this line MUST be placed AFTER .save(),
  // or the UPDATE will be performed before the insert.
  // I wasted 2 HOURS on that point.
  await universe.$add('heroes', [hero]);
  return hero;
}

export { createUniverse, createHero };
