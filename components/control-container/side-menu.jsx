import { useEffect, useState } from 'react'
import Link from 'next/link'
import { menuItems, Routes } from 'utils/CONSTANTS'
import { provcessNavChanges } from 'utils/helpers'

import styles from 'styles/control-container.module.scss'

export const SideMenu = ({ currentURL }) => {
  const [navLinks, setNavLinks] = useState(menuItems)

  useEffect(() => {
    const newNavList = provcessNavChanges({ menuItems, currentURL })
    setNavLinks(newNavList)
  }, [currentURL])

  return (
    <nav className={styles['side-menu']}>
      <ul className={styles['nav-list']}>
        {navLinks.map(({ item, key, path }) => (
          <li
            key={key}
            className={
              path === currentURL
                ? styles['nav-link__active']
                : styles['nav-link']
            }
          >
            <Link
              href={path !== Routes.HOME ? `${Routes.BASE}${path}` : '/home'}
              shallow={true}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
