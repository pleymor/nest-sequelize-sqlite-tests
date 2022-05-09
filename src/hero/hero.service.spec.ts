import { Sequelize } from 'sequelize-typescript';
import { HeroService } from './hero.service';
import { Hero } from './hero.model';
import { Universe } from '../universe/universe.model';
import { createMemDB } from '../utils/testing-helpers/createMemDb';
import { createHero } from '../utils/testing-helpers/modelFactories';

describe('HeroService', () => {
  let heroService: HeroService;
  let memDb: Sequelize;

  beforeAll(async () => {
    // Initiate Sequelize with SQLite and our models
    memDb = await createMemDB([Hero, Universe]);

    // Instantiate our service with our model
    heroService = new HeroService(Hero);
  });
  afterAll(() => memDb.close());

  describe('hasProductsWithBatteries', () => {
    let marvel;
    let dc;

    beforeEach(async () => {
      // Creation of our universes
      marvel = await Universe.create({ id: 1, name: 'marvel' });
      dc = await Universe.create({ id: 2, name: 'dc' });
    });

    afterEach(async () => {
      // clean out the database after every test
      await memDb.truncate();
    });

    it('should return only heroes with a cape', async () => {
      // Creation of our heroes
      await createHero(1, 'Cap Marvel', true, marvel);
      await createHero(2, 'Hulk', false, marvel);

      const actual = await heroService.find({
        universe: 'marvel',
        withCape: 'true',
      });

      expect(actual.some((hero) => hero.name === 'Cap Marvel')).toBeTruthy();
      expect(actual.some((hero) => hero.name === 'Hulk')).toBeFalsy();
    });

    it('should return only heroes from the given universe', async () => {
      // Creation of our heroes
      await createHero(1, 'Bat Woman', true, dc);
      await createHero(2, 'Cap Marvel', true, marvel);

      const actual = await heroService.find({
        universe: 'marvel',
        withCape: 'true',
      });

      expect(actual.some((hero) => hero.name === 'Cap Marvel')).toBeTruthy();
      expect(actual.some((hero) => hero.name === 'Bat Woman')).toBeFalsy();
    });
  });
});
