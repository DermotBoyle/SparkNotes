export const menuItems = [
  { item: 'home', key: 1, path: '/home' },
  { item: 'view all', key: 2, path: 'view-all' },
  { item: 'find', key: 3, path: 'find' },
  { item: 'about', key: 4, path: 'about' }
]

export const Routes = {
  BASE: '/home?section=',
  HOME: '/home',
  VIEW_ALL: 'view-all',
  FIND: 'find',
  ABOUT: 'about',
  CREATE: 'create-note',
  EDIT: 'edit-note'
}

export const Methods = {
  PUT: 'PUT',
  GET: 'GET',
  DELETE: 'DELETE',
  POST: 'POST'
}
