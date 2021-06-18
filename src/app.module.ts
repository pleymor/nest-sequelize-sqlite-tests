import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { HeroModule } from './hero/hero.module';

@Module({
  imports: [
    TerminusModule, // health checks
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      pool: {
        min: 1,
        max: 5,
        acquire: 30000,
        idle: 20000,
      },
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadModels: true,
      omitNull: true,
      synchronize: false,
    }),
    HeroModule,
  ],
  controllers: [],
})
export class AppModule {}
