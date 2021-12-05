import { UserCategory } from 'src/category.type';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('varchar', { length: 255 })
  readonly registrant: string;

  @Column({
    type: 'enum',
    enum: ['valuables', 'stationery', 'clothing', 'others', 'unset'],
    default: 'unset',
  })
  searching_category: UserCategory;
}
