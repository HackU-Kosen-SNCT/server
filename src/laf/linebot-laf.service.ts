import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemCategory } from './laf.dto';
import { Laf } from './laf.entity';

@Injectable()
export class LinebotLafService {
  constructor(@InjectRepository(Laf) private lafRepository: Repository<Laf>) {}

  async getLafItemInThePastWeekByCategory(
    category: ItemCategory,
  ): Promise<Laf[]> {
    const items = await this.lafRepository.find({
      where: { category },
    });
    if (items) {
      return items.filter((item) => {
        return (
          (new Date().getTime() - item.created_at.getTime()) /
            (1000 * 60 * 60 * 24) <
          7
        );
      });
    } else {
      return [];
    }
  }
}
