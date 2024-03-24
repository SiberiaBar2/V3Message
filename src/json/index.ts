const thrid = [
  {
    level: '3',
    name: '课件'
  },
  // {
  //   level: '3',
  //   name: '预习资料'
  // },
  // {
  //   level: '3',
  //   name: '单元卷'
  // },
  // {
  //   level: '3',
  //   name: '周月考'
  // },
  {
    level: '3',
    name: '本学期知识点'
  },
  {
    level: '3',
    name: '分类提升'
  },
  {
    level: '3',
    name: '题型组合'
  },
  {
    level: '3',
    name: '期中期末卷'
  },
  {
    level: '3',
    name: '复习课件'
  },
  {
    level: '3',
    name: '练习题'
  },
  // {
  //   level: '3',
  //   name: '教辅'
  // }
]

const thridChinese = [
  {
    level: '3',
    name: '课件'
  },
  {
    level: '3',
    name: '预习资料'
  },
  {
    level: '3',
    name: '单元卷'
  },
  {
    level: '3',
    name: '周月考'
  },
  {
    level: '3',
    name: '本学期知识点'
  },
  // {
  //   level: '3',
  //   name: '分类提升'
  // },
  // {
  //   level: '3',
  //   name: '题型组合', 
  //   children: [
  //       {
  //         level: '4',
  //         name: '（音）字词专项'
  //       },
  //       {
  //         level: '4',
  //         name: '句法练习'
  //       },
  //       {
  //         level: '4',
  //         name: '课文内容填空'
  //       },
  //       {
  //         level: '4',
  //         name: '古诗与积累'
  //       },
  //       {
  //         level: '4',
  //         name: '写作与交际'
  //       },
  //       {
  //         level: '4',
  //         name: '课内阅读'
  //       },
  //       {
  //         level: '4',
  //         name: '课外阅读'
  //       },
  //       {
  //         level: '4',
  //         name: '整合提升'
  //       },
  //       {
  //         level: '4',
  //         name: '题本套卷'
  //       },
  //       {
  //         level: '4',
  //         name: '素质能力拓展'
  //       },
  //   ]
  // },
  {
    level: '3',
    name: '期中期末卷'
  },
  {
    level: '3',
    name: '复习课件'
  },
  {
    level: '3',
    name: '教辅'
  }
]

export const list = [
  {
    level: 'y1',
    name: '语文',
    children: [
      {
        level: '2',
        name: '语文1年级上册',
        children: [...thridChinese]
      },
      {
        level: '2',
        name: '语文1年级下册',
        children: [...thridChinese]
      },
      {
        level: '2',
        name: '语文2年级上册',
        children: [...thridChinese]
      },
      {
        level: '2',
        name: '语文2年级下册',
        children: [...thridChinese]
      },
      {
        level: '2',
        name: '语文3年级上册',
        children: [...thridChinese]
      },
      {
        level: '2',
        name: '语文4年级下册',
        children: [...thridChinese]
      },
      {
        level: '2',
        name: '语文4年级上册',
        children: [...thridChinese]
      },
      {
        level: '2',
        name: '语文4年级下册',
        children: [...thridChinese]
      },
      {
        level: '2',
        name: '语文5年级上册',
        children: [...thridChinese]
      },
      {
        level: '2',
        name: '语文5年级下册',
        children: [...thridChinese]
      },
      {
        level: '2',
        name: '语文6年级上册',
        children: [...thridChinese]
      },
      {
        level: '2',
        name: '语文6年级下册',
        children: [...thridChinese]
      }
    ]
  },
  {
    level: 's1',
    name: '数学',
    children: [
      {
        level: '2',
        name: '数学1年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '数学1年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '数学2年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '数学2年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '数学3年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '数学4年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '数学4年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '数学4年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '数学5年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '数学5年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '数学6年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '数学6年级下册',
        children: [...thrid]
      }
    ]
  },
  {
    level: '1',
    name: '英语',
    children: [
      {
        level: '2',
        name: '英语3年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '英语4年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '英语4年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '英语4年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '英语5年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '英语5年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '英语6年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '英语6年级下册',
        children: [...thrid]
      }
    ]
  },
  {
    level: '1',
    name: '道德与法治',
    children: [
      {
        level: '2',
        name: '道德与法治3年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '道德与法治4年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '道德与法治4年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '道德与法治4年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '道德与法治5年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '道德与法治5年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '道德与法治6年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '道德与法治6年级下册',
        children: [...thrid]
      }
    ]
  },
  {
    level: '1',
    name: '科学',
    children: [
      {
        level: '2',
        name: '科学3年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '科学4年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '科学4年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '科学4年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '科学5年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '科学5年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '科学6年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '科学6年级下册',
        children: [...thrid]
      }
    ]
  },
  {
    level: '1',
    name: '音乐',
    children: [
      {
        level: '2',
        name: '音乐3年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '音乐4年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '音乐4年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '音乐4年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '音乐5年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '音乐5年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '音乐6年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '音乐6年级下册',
        children: [...thrid]
      }
    ]
  },
  {
    level: '1',
    name: '美术',
    children: [
      {
        level: '2',
        name: '美术3年级上册',
        children: [
          {
            level: '3',
            name: '课件',
            children: [...thrid]
          },
          {
            level: '3',
            name: '预习资料',
            children: [...thrid]
          },
          {
            level: '3',
            name: '单元卷',
            children: [...thrid]
          },
          {
            level: '3',
            name: '周月考',
            children: [...thrid]
          },
          {
            level: '3',
            name: '本学期知识点',
            children: [...thrid]
          },
          {
            level: '3',
            name: '分类提升',
            children: [...thrid]
          },
          {
            level: '3',
            name: '题型组合',
            children: [...thrid]
          },
          {
            level: '3',
            name: '期中期末卷',
            children: [...thrid]
          },
          {
            level: '3',
            name: '复习课件',
            children: [...thrid]
          },
          {
            level: '3',
            name: '教辅',
            children: [...thrid]
          }
        ]
      },
      {
        level: '2',
        name: '美术4年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '美术4年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '美术4年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '美术5年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '美术5年级下册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '美术6年级上册',
        children: [...thrid]
      },
      {
        level: '2',
        name: '美术6年级下册',
        children: [...thrid]
      }
    ]
  },
  {
    level: '1',
    name: '素养成长'
  },
  {
    level: '1',
    name: '国学经典'
  },
  {
    level: '1',
    name: '家庭教育'
  },
  {
    level: '1',
    name: '科创'
  }
]
