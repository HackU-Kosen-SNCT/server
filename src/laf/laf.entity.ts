import { Category } from 'src/category.type';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Laf extends BaseEntity {
  @PrimaryColumn()
  readonly item_id: string;

  // lengthはlineのuser_id依存
  @Column('varchar', { length: 100, nullable: true })
  registrant: string;

  @Column({
    type: 'enum',
    enum: ['valuables', 'stationery', 'clothing', 'others', 'unset'],
    default: 'unset',
  })
  category: Category;

  @Column('varchar', { length: 100, nullable: true })
  detail: string;

  @Column('double')
  latitude: number;

  @Column('double')
  longitude: number;

  @Column('varchar', { length: 100 })
  image_url: string;

  @Column('varchar', { length: 140, nullable: true })
  message: string;

  @Column('datetime')
  created_at: Date;

  @Column('datetime', { nullable: true })
  received_at: Date;
}
