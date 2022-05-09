import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UniverseService } from './universe.service';
import { Universe } from './universe.model';

@Module({
  imports: [SequelizeModule.forFeature([Universe])],
  providers: [UniverseService],
  exports: [UniverseService],
})
export class UniverseModule {}
