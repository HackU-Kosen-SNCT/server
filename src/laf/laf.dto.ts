import { ApiProperty } from '@nestjs/swagger';

// TODO: どういうtypeにするか要相談
type lafStatus = 'received' | 'not received' | 'new';

export class LafItem {
  @ApiProperty()
  category: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  status: lafStatus;

  @ApiProperty()
  detail: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  image: string;
}

export class GetLafItemsResponse {
  @ApiProperty({ type: [LafItem] })
  items: LafItem[];
}
