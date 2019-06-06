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
    },{
      valueId: '3',
      valueName: 'L'
    }]
  }, {
    attrId: '2',
    attrName: '颜色',
    values: [{
      valueId: '4',
      valueName: '白色'
    },{
      valueId: '5',
      valueName: '黄色'
    },{
      valueId: '6',
      valueName: '蓝色'
    }]
  }, {
    attrId: '3',
    attrName: '新旧',
    values: [{
      valueId: '7',
      valueName: '一手货'
    },{
      valueId: '8',
      valueName: '二手货'
    }]
  }]
}

export function getGoodsSku () {
  return {
    "1,4,7": {
      price: '147',
      count: '1'
    },
    "1,4,8": {
      price: '148',
      count: '0'
    },
    "1,5,7": {
      price: '157',
      count: '0'
    },
    "1,5,8": {
      price: '15',
      count: '0'
    },
    "1,6,7": {
      price: '16',
      count: '5'
    },
    "1,6,8": {
      price: '16',
      count: '0'
    },
    "2,4,7": {
      price: '24',
      count: '7'
    },
    "2,4,8": {
      price: '24',
      count: '0'
    },
    "2,5,7": {
      price: '25',
      count: '9'
    },
    "2,5,8": {
      price: '25',
      count: '0'
    },
    "2,6,7": {
      price: '26',
      count: '11'
    },
    "2,6,8": {
      price: '26',
      count: '0'
    },
    "3,4,7": {
      price: '34',
      count: '13'
    },
    "3,4,8": {
      price: '34',
      count: '0'
    },
    "3,5,7": {
      price: '35',
      count: '15'
    },
    "3,5,8": {
      price: '35',
      count: '0'
    },
    "3,6,7": {
      price: '36',
      count: '17'
    },
    "3,6,8": {
      price: '36',
      count: '0'
    }
  }
}
