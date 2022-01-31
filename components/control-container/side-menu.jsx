import React from 'react'
import Link from 'next/link'
import { menuItems, Routes } from 'utils/CONSTANTS'

import styles from 'styles/control-container.module.scss'

export const SideMenu = ({ currentURL }) => {
  return (
    <nav className={styles['side-menu']}>
      <ul className={styles['nav-list']}>
        {menuItems.map(({ item, key, path }) => (
          <li
            data-testid={item}
            key={key}
            className={
              path === currentURL
                ? styles['nav-link__active']
                : styles['nav-link']
            }
          >
            <Link
              href={path !== Routes.HOME ? `${Routes.BASE}${path}` : Routes.HOME}
              shallow={true}
            >
              <a>{item}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
