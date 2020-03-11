import * as categoryAPI from './fakegenre'

const menus = [
  {
    _id: '5b21ca3eeb7f6fbccd471815',
    title: 'Roseberry Sandwich',
    description: 'With roseberry and jam, ',
    ingredients: ['jam'],
    cost: 20,
    category: { _id: '1', name: 'Sandwich' },
    src:
      'https://www.ivsky.com/tupian/sanmingzhi_v58422/pic_918571.html#al_tit',

    alt: 'Roseberry Sandwich',
    note: 'Available after 10:30am at participating restaurants',
    href: '/menu/roseberry-sandwich',
  },
  {
    _id: '5b21ca3eeb7f6fbccd471816',
    title: 'Beef Sandwich',
    description:
      'Serving with beef,lettuce,cheese and tomato and whole-wheat bread',
    ingredients: ['mayonnaise', 'cheese'],
    cost: 25,
    category: { _id: '1', name: 'Sandwich' },
    src:
      'https://www.ivsky.com/tupian/sanmingzhi_v58422/pic_918574.html#al_tit',

    alt: 'Beef Sandwich',
    note: 'Available after 10:30am at participating restaurants',
    href: '/menu/beef-sandwich',
  },
  {
    _id: '5b21ca3eeb7f6fbccd471817',
    title: 'Health Sandwich',
    description: 'Serving with avocado,lettuce, and whole-wheat bread',
    ingredients: ['mayonnaise'],
    cost: 15,
    category: { _id: '1', name: 'Sandwich' },
    src:
      'https://www.ivsky.com/tupian/sanmingzhi_v58422/pic_918579.html#al_tit',
    alt: 'Beef Sandwich',
    note: 'Available after 10:30am at participating restaurants',
    href: '/menu/health-sandwich',
  },
  {
    _id: '5b21ca3eeb7f6fbccd471818',
    title: 'Tomato Pasta',
    description: 'Serving with seafood,tomato pasta sauce and spagetti',
    ingredients: ['tommato sauce'],
    cost: 25,
    category: { _id: '2', name: 'Pasta' },
    src: 'https://www.ivsky.com/tupian/pasta_v57859/pic_907368.html#al_tit',
    alt: 'Tomato Pasta',
    note: 'Available after 10:30am at participating restaurants',
    href: '/menu/tomato-pasta',
  },
  {
    _id: '5b21ca3eeb7f6fbccd471819',
    title: 'Mushroom Pasta',
    description: 'Serving with mushroom,cream pasta sauce and fettuccine',
    ingredients: ['cream'],
    cost: 25,
    category: { _id: '2', name: 'Pasta' },
    src: 'https://www.ivsky.com/tupian/pasta_v57859/pic_907374.html#al_tit',
    alt: 'Mushroom Pasta',
    note: 'Available after 10:30am at participating restaurants',
    href: '/menu/mushroom-pasta',
  },

  {
    _id: '5b21ca3eeb7f6fbccd471820',
    title: 'Seafood Pasta',
    description:
      'Serving with australia prawn,special pasta sauce and spagetti',
    ingredients: ['garlic'],
    cost: 30,
    category: { _id: '2', name: 'Pasta' },
    src: 'https://www.ivsky.com/tupian/yimian_v54339/pic_850043.html#al_tit',
    alt: 'Seafood Pasta',
    note: 'Available after 10:30am at participating restaurants',
    href: '/menu/seafood-pasta',
  },
]

export function getMenus() {
  return menus
}

export function getMenu(id) {
  return menus.find(m => m._id == id)
}

export function saveMenu(menu) {
  let menuInDb = menus.find(m => m._id == menu._id) || {}
  menuInDb.name = menu.name
  menuInDb.category = categoryAPI.categories.find(
    g => g._id === menu.categoryId
  )
  menuInDb.cost = menu.cost
  menuInDb.description = menu.description
  menuInDb.alt = menu.alt
  menuInDb.note = menu.note

  if (!menuInDb._id) {
    menuInDb._id = Date.now()
    menus.push(menuInDb)
  }

  return menuInDb
}

export function deleteMenu(id) {
  let menuInDb = menus.find(m => m._id === id)
  menus.splice(menus.indexOf(menuInDb), 1)
  return menuInDb
}
