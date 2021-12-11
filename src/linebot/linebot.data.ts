import { QuickReplyItem, RichMenu } from '@line/bot-sdk';

export const UpdateQuickReply: QuickReplyItem[] = [
  {
    type: 'action',
    action: {
      type: 'postback',
      label: '登録を解除する',
      text: '解除',
      data: 'unset',
    },
  },
  {
    type: 'action',
    action: {
      type: 'postback',
      label: '財布',
      text: '財布',
      data: 'wallet',
    },
  },
  {
    type: 'action',
    action: {
      type: 'postback',
      label: 'スマホ',
      text: 'スマホ',
      data: 'smartPhone',
    },
  },
  {
    type: 'action',
    action: {
      type: 'postback',
      label: '水筒',
      text: '水筒',
      data: 'waterBottle',
    },
  },
  {
    type: 'action',
    action: {
      type: 'postback',
      label: '文房具',
      text: '文房具',
      data: 'stationery',
    },
  },
  {
    type: 'action',
    action: {
      type: 'postback',
      label: '鍵',
      text: '鍵',
      data: 'key',
    },
  },
  {
    type: 'action',
    action: {
      type: 'postback',
      label: 'USBメモリ',
      text: 'USBメモリ',
      data: 'usb',
    },
  },
  {
    type: 'action',
    action: {
      type: 'postback',
      label: '教科書・ノート・ファイル',
      text: '教科書・ノート・ファイル',
      data: 'textbook/notebook/file',
    },
  },
  {
    type: 'action',
    action: {
      type: 'postback',
      label: 'イヤホン',
      text: 'イヤホン',
      data: 'earphone',
    },
  },
  {
    type: 'action',
    action: {
      type: 'postback',
      label: '電卓',
      text: '電卓',
      data: 'calculator',
    },
  },
  {
    type: 'action',
    action: {
      type: 'postback',
      label: '傘',
      text: '傘',
      data: 'umbrella',
    },
  },
  {
    type: 'action',
    action: {
      type: 'postback',
      label: '衣料品',
      text: '衣料品',
      data: 'clothing',
    },
  },
  {
    type: 'action',
    action: {
      type: 'postback',
      label: 'その他',
      text: 'その他',
      data: 'others',
    },
  },
];

export const richMenu: RichMenu = {
  size: {
    width: 1200,
    height: 405,
  },
  selected: true,
  name: 'リッチメニュー 1',
  chatBarText: 'メニュー一覧',
  areas: [
    {
      bounds: {
        x: 0,
        y: 0,
        width: 600,
        height: 405,
      },
      action: {
        type: 'uri',
        uri: 'https://liff.line.me/1656701091-JxvpwXG2',
      },
    },
    {
      bounds: {
        x: 600,
        y: 0,
        width: 600,
        height: 405,
      },
      action: {
        type: 'postback',
        data: 'update',
      },
    },
  ],
};
