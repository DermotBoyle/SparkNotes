export const provcessNavChanges = ({ menuItems, currentUrl }) =>
  menuItems.filter(({ path }) => path !== currentUrl || path === '/home')
