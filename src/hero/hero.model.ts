import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Universe } from '../universe/universe.model';

@Table({ tableName: 'heroes', createdAt: false, updatedAt: false })
class Hero extends Model {
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
