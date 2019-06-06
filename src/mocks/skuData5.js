export function getAttrList () {
  return [{
    attrId: '1',
    attrName: '尺码',
    values: [{
      valueId: '1',
      valueName: 'S'
    },{
      valueId: '2',
      valueName: 'M'
    }]
  }, {
    attrId: '2',
    attrName: '颜色',
    values: [{
      valueId: '3',
      valueName: '白色'
    },{
      valueId: '4',
      valueName: '黄色'
    },{
      valueId: '5',
      valueName: '蓝色'
    }]
  }, {
    attrId: '3',
    attrName: '新旧',
    values: [{
      valueId: '6',
      valueName: '一手货'
    },{
      valueId: '7',
      valueName: '二手货'
    }]
  }, {
    attrId: '4',
    attrName: '乱搞',
    values: [{
      valueId: '8',
      valueName: '搞屎棍'
    },{
      valueId: '9',
      valueName: '别告我'
    }]
  }]
}

export function getGoodsSku () {
  return {
    "1,3,6,8": {
      price: '10',
      count: '0'
    },
    "1,3,6,9": {
      price: '12',
      count: '0'
    },
    "1,3,7,8": {
      price: '14',
      count: '3'
    },
    "1,3,7,9": {
      price: '16',
      count: '4'
    },
    "1,4,6,8": {
      price: '18',
      count: '0'
    },
    "1,4,6,9": {
      price: '20',
      count: '0'
    },
    "1,4,7,8": {
      price: '22',
      count: '6'
    },
    "1,4,7,9": {
      price: '24',
      count: '7'
    },
    "1,5,6,8": {
      price: '26',
      count: '0'
    },
    "1,5,6,9": {
      price: '28',
      count: '0'
    },
    "1,5,7,8": {
      price: '30',
      count: '10'
    },
    "1,5,7,9": {
      price: '32',
      count: '0'
    },
    "2,3,6,8": {
      price: '10',
      count: '0'
    },
    "2,3,6,9": {
      price: '12',
      count: '0'
    },
    "2,3,7,8": {
      price: '14',
      count: '3'
    },
    "2,3,7,9": {
      price: '16',
      count: '4'
    },
    "2,4,6,8": {
      price: '18',
      count: '0'
    },
    "2,4,6,9": {
      price: '20',
      count: '0'
    },
    "2,4,7,8": {
      price: '22',
      count: '6'
    },
    "2,4,7,9": {
      price: '24',
      count: '7'
    },
    "2,5,6,8": {
      price: '26',
      count: '0'
    },
    "2,5,6,9": {
      price: '28',
      count: '0'
    },
    "2,5,7,8": {
      price: '30',
      count: '10'
    },
    "2,5,7,9": {
      price: '32',
      count: '11'
    }
  }
}
