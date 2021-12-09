import { ItemCategory } from './laf.dto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Laf {
  @PrimaryColumn('varchar', { length: 20 })
  readonly item_id: string;

  // lengthはlineのuser_id依存
  @Column('varchar', { length: 255, nullable: true })
  registrant: string;

  @Column({
    type: 'enum',
    enum: ['valuables', 'stationery', 'clothing', 'others'],
    default: 'others',
  })
  category: ItemCategory;

  @Column('varchar', { length: 255, nullable: true })
  detail: string;

  @Column('text')
  image_url: string;

  @Column('varchar', { length: 255, nullable: true })
  message: string;

  @Column('datetime')
  created_at: Date;

  @Column('datetime', { nullable: true })
  received_at: Date;

  constructor(
    item_id: string,
    category: ItemCategory,
    image_url: string,
    created_at: Date,
    detail?: string,
  ) {
    this.item_id = item_id;
    this.registrant = null;
    this.category = category;
    this.detail = detail;
    this.image_url = image_url;
    this.message = null;
    this.created_at = created_at;
    this.received_at = null;
  }
}
