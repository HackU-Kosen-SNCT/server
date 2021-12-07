import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateLafItemDto, ReceiveDto, RegistrantDto } from './laf.dto';
import { Laf } from './laf.entity';

@Injectable()
export class LafService {
  constructor(
    @InjectRepository(Laf) private lafRepository: Repository<Laf>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getLafItems(): Promise<Laf[]> {
    return await this.lafRepository.find();
  }

  async createLafItem(createLafItemDto: CreateLafItemDto): Promise<Laf> {
    const {
      item_id,
      category,
      latitude,
      longitude,
      image_url,
      created_at,
      detail,
    } = createLafItemDto;

    // 既にitem_idが同じものがあるかどうか
    const isExistsItem = await this.lafRepository.findOne(item_id);
    if (isExistsItem) {
      // 同じものがあった場合
      return;
    }

    const item = new Laf(
      item_id,
      category,
      latitude,
      longitude,
      image_url,
      created_at,
      detail,
    );

    await this.lafRepository.save(item);
    return item;
  }

  async registrant(registrantDto: RegistrantDto): Promise<Laf> {
    const { item_id, registrant } = registrantDto;
    const item = await this.lafRepository.findOne(item_id);
    // itemが存在しなかった時
    if (!item) {
      return;
    }

    const registrantCheck = await this.userRepository.findOne(registrant);
    // registrantが存在しなかった時
    if (!registrantCheck) {
      return;
    }

    item.registrant = registrant;
    await this.lafRepository.save(item);
    return item;
  }

  async receive(receiveDto: ReceiveDto): Promise<Laf> {
    const { item_id, message, received_at } = receiveDto;
    const item = await this.lafRepository.findOne(item_id);
    // itemが存在しなかった時
    if (!item) {
      return;
    }
    item.message = message;
    item.received_at = received_at;

    await this.lafRepository.save(item);
    // LINEに送信処
    return item;
  }
}
