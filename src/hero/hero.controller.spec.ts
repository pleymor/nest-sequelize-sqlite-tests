import { Test, TestingModule } from '@nestjs/testing';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { CacheModule } from '@nestjs/common';

const h1 = {
  id: 1,
  name: 'batman',
  hasCape: true,
};

const h2 = {
  id: 1,
  name: 'superman',
  hasCape: true,
};

describe('HeroController', () => {
  let heroController: HeroController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [HeroController],
      providers: [
        {
          provide: HeroService,
          useValue: {
            findHeroesWithCape: jest.fn(() => [h1, h2]),
          },
        },
      ],
    }).compile();

    heroController = app.get<HeroController>(HeroController);
  });

  describe('hasProductsWithBatteries', () => {
    it('should return true if the service returns true', () => {
      const params = {
        universe: 'marvel',
      };
      expect(heroController.findHeroesWithCape(params)).toEqual([h1, h2]);
    });
  });
});
