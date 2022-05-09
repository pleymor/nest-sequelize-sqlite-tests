import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { SequelizeModule } from '@nestjs/sequelize';
import { HeroModule } from './hero/hero.module';

@Module({
  imports: [
    TerminusModule, // health checks
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      autoLoadModels: true,
      omitNull: true,
      synchronize: true,
    }),
    HeroModule,
  ],
})
export class AppModule {}
