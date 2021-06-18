import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Hero } from './hero.model';

@Table({ tableName: 'universes' })
class Universe extends Model<Universe> {
  @Column({ primaryKey: true })
  id: number;

  @Column({ allowNull: false, unique: true })
  name: string;

  // Don't think it's useless
  @HasMany(() => Hero)
  public heroes: Hero[];
}

export { Universe };
