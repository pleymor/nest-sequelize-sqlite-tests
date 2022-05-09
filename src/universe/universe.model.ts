import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Hero } from '../hero/hero.model';

@Table({ tableName: 'universes', createdAt: false, updatedAt: false })
class Universe extends Model {
  @Column({ primaryKey: true })
  id: number;

  @Column({ allowNull: false, unique: true })
  name: string;

  // Don't think it's useless
  @HasMany(() => Hero)
  public heroes: Hero[];
}

export { Universe };
