import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { HeroModule } from '../src/hero/hero.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import initData from '../src/utils/testing-helpers/initData';

describe('e2e', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'sqlite',
          autoLoadModels: true,
          omitNull: true,
          synchronize: true,
        }),
        HeroModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.useGlobalPipes(new ValidationPipe());
    app.enableShutdownHooks();
    await app.init();

    // let's init a few data =)
    await initData(app);
  });

  afterAll(() => app.close());

  it('/heroes?universe=dc', async () => {
    return app
      .inject({
        method: 'GET',
        url: '/heroes?universe=dc',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.payload)).toEqual([
          {
            id: 20,
            name: 'batman',
            hasCape: true,
          },
          {
            id: 21,
            name: 'superman',
            hasCape: true,
          },
        ]);
      });
  });

  it('/heroes?universe=marvel&withCape=false', async () => {
    return app
      .inject({
        method: 'GET',
        url: '/heroes?universe=marvel&withCape=false',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.payload)).toEqual([
          {
            id: 10,
            name: 'hulk',
            hasCape: false,
          },
        ]);
      });
  });

  it('/heroes', async () => {
    return app
      .inject({
        method: 'GET',
        url: '/heroes',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(400);
      });
  });

  it('/heroes?universe=reality&withCape=true', async () => {
    return app
      .inject({
        method: 'GET',
        url: '/heroes?universe=reality&withCape=true',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.payload)).toEqual([]);
      });
  });
});
