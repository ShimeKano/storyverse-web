export const storyTemplate = {
  title: 'Mẫu truyện mới',
  description: 'Mô tả ngắn cho truyện',
  type: 'HORROR',
  status: 'DRAFT',
  nodes: [
    {
      clientId: 'start',
      title: 'Mở đầu',
      content: 'Bạn đứng trước ngã rẽ.',
      isStart: true,
      isEnding: false,
      rewardExp: 5,
      choices: [
        { text: 'Đi bên trái', nextClientId: 'left_end' },
        { text: 'Đi bên phải', nextClientId: 'right_end' }
      ]
    },
    {
      clientId: 'left_end',
      title: 'Kết trái',
      content: 'Bạn tìm được lối thoát.',
      isStart: false,
      isEnding: true,
      endingType: 'HAPPY_END',
      rewardExp: 20
    },
    {
      clientId: 'right_end',
      title: 'Kết phải',
      content: 'Bạn bị lạc trong bóng tối.',
      isStart: false,
      isEnding: true,
      endingType: 'BAD_END',
      rewardExp: 10
    }
  ]
};
