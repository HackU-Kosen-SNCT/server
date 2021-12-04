import { Category } from 'src/category.type';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('varchar', { length: 255 })
  readonly user_id: string;

  @Column({
    type: 'enum',
    enum: ['valuables', 'stationery', 'clothing', 'others', 'unset'],
    default: 'unset',
  })
  searching_category: Category;
}
