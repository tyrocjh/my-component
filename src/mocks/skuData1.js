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
  }]
}

export function getGoodsSku () {
  return {
    "1,4": {
      price: '14',
      count: '1'
    },
    "1,5": {
      price: '15',
      count: '0'
    },
    "1,6": {
      price: '16',
      count: '3'
    },
    "2,4": {
      price: '24',
      count: '0'
    },
    "2,5": {
      price: '25',
      count: '0'
    },
    "2,6": {
      price: '26',
      count: '7'
    },
    "3,4": {
      price: '34',
      count: '9'
    },
    "3,5": {
      price: '35',
      count: '0'
    },
    "3,6": {
      price: '36',
      count: '11'
    }
  }
}
