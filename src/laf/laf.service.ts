import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LafItemPropertyDto } from './laf.dto';
import { Laf } from './laf.entity';

@Injectable()
export class LafService {
  constructor(@InjectRepository(Laf) private lafRepository: Repository<Laf>) {}

  async getLafItems(): Promise<Laf[]> {
    return await this.lafRepository.find();
  }

  async createLafItem(lafItemPropertyDto: LafItemPropertyDto): Promise<Laf> {
    const {
      item_id,
      category,
      latitude,
      longitude,
      image_url,
      created_at,
      detail,
    } = lafItemPropertyDto;
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
}
