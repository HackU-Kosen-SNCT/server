import { ColorType, ItemCategory } from './laf.dto';
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
    enum: [
      'wallet',
      'smartPhone',
      'waterBottle',
      'stationery',
      'key',
      'usb',
      'textbook/notebook/file',
      'earphone',
      'calculator',
      'umbrella',
      'clothing',
      'others',
    ],
    default: 'others',
  })
  category: ItemCategory;

  @Column({
    type: 'enum',
    enum: [
      '#FFFFFF',
      '#02331B',
      '#999999',
      '#FF2323',
      '#FF3399',
      '#FF33FF',
      '#9933FF',
      '#3333FF',
      '#3399FF',
      '#33FFFF',
      '#33FF33',
      '#99FF33',
      '#FFFF33',
      '#FF9933',
    ],
    default: '#FFFFFF',
  })
  color: ColorType;

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
    color: ColorType,
    image_url: string,
    created_at: Date,
    detail?: string,
  ) {
    this.item_id = item_id;
    this.registrant = null;
    this.category = category;
    this.color = color;
    this.detail = detail;
    this.image_url = image_url;
    this.message = null;
    this.created_at = created_at;
    this.received_at = null;
  }
}
