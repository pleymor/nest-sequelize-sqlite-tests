import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Universe } from './universe.model';

@Table({ tableName: 'heroes' })
class Hero extends Model<Hero> {
  @Column({ primaryKey: true })
  id: number;

  // Don't forget universeId :D
  @ForeignKey(() => Universe)
  @Column
  universeId: number;

  @BelongsTo(() => Universe)
  universe: Universe;

  @Column({ allowNull: false, unique: true })
  name: string;

  @Column({ allowNull: false })
  hasCape: boolean;
}

export { Hero };
