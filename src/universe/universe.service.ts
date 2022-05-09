import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Universe } from './universe.model';

@Injectable()
export class UniverseService {
  constructor(
    @InjectModel(Universe)
    private readonly universeModel: typeof Universe,
  ) {}

  /**
   * Creates a universe.
   */
  async create(id: number, name: string): Promise<Universe> {
    console.info(`Creating universe ${name}`);

    return Universe.create({
      id,
      name,
    });
  }
}
