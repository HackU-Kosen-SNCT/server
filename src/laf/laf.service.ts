import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLafItemDto, ReceiveDto, RegistrantDto } from './laf.dto';
import { Laf } from './laf.entity';

@Injectable()
export class LafService {
  constructor(@InjectRepository(Laf) private lafRepository: Repository<Laf>) {}

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
    const item = new Laf(
      item_id,
      category,
      latitude,
      longitude,
      image_url,
      created_at,
      detail,
    );

    try {
      await this.lafRepository.save(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return item;
  }

  async registrant(registrantDto: RegistrantDto): Promise<Laf> {
    const { item_id, registrant } = registrantDto;
    const item = await this.lafRepository.findOne(item_id);
    item.registrant = registrant;

    try {
      await this.lafRepository.save(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return item;
  }

  async receive(receiveDto: ReceiveDto): Promise<Laf> {
    const { item_id, message, received_at } = receiveDto;
    const item = await this.lafRepository.findOne(item_id);
    item.message = message;
    item.received_at = received_at;

    try {
      await this.lafRepository.save(item);
      // TODO: LINE側に送信処理
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return item;
  }
}
