import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemCategory } from './laf.dto';
import { Laf } from './laf.entity';

@Injectable()
export class LinebotLafService {
  constructor(@InjectRepository(Laf) private lafRepository: Repository<Laf>) {}

  async getLafItemInThePastWeekByCategory(category: ItemCategory) {
    return await this.lafRepository.find({
      where: { category },
    });
  }
}
