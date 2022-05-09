import { Universe } from '../../universe/universe.model';
import { Hero } from '../../hero/hero.model';

async function createHero(
  id: number,
  name: string,
  hasCape: boolean,
  universe: Universe,
): Promise<Hero> {
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

export { createHero };
