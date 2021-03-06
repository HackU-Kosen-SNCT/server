import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinebotService } from 'src/linebot/linebot.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateLafItemDto, ReceiveDto, RegistrantDto } from './laf.dto';
import { Laf } from './laf.entity';

@Injectable()
export class LafService {
  constructor(
    @InjectRepository(Laf) private lafRepository: Repository<Laf>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private linebotService: LinebotService,
    private userService: UserService,
  ) {}

  async getLafItems(): Promise<Laf[]> {
    return await this.lafRepository.find();
  }

  async createLafItem(createLafItemDto: CreateLafItemDto): Promise<Laf> {
    const { item_id, category, color, image_url, created_at, detail } =
      createLafItemDto;

    // 既にitem_idが同じものがあるかどうか
    const isExistsItem = await this.lafRepository.findOne(item_id);
    if (isExistsItem) {
      // 同じものがあった場合
      return;
    }

    const item = new Laf(
      item_id,
      category,
      color,
      image_url,
      created_at,
      detail,
    );
    await this.lafRepository.save(item);

    // LINEBotへの送信処理
    // searching_categoryがitem.categoryの人のuserIdを取得
    const result = await this.userService.userIdsToFindThatCategory(
      item.category,
    );
    const userIds: string[] = result.map((r) => r.registrant);
    this.linebotService.sendLafItemToLinebot(userIds, item);

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
    // LINEに送信処理
    if (item.registrant) {
      this.linebotService.sendTheMessageOfThanks(
        message,
        item.registrant,
        item.image_url,
      );
    }
    return item;
  }
}
