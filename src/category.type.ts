// 登録時に設定できるカテゴリ
export type ItemCategory = 'valuables' | 'stationery' | 'clothing' | 'others';

// ユーザーが設定できるカテゴリ
export type UserCategory =
  | 'valuables'
  | 'stationery'
  | 'clothing'
  | 'others'
  | 'unset';
