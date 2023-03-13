import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import MaterialIcon from '@/components/ui/MaterialIcon'

import { t } from '@/hooks/getLang'

import styles from './Menu.module.scss'
import { IMenuItem } from './menu.interface'

const MenuItem: FC<IMenuItem> = ({ icon, link, title }) => {
  const { asPath } = useRouter()
  return (
    <li
      className={cn({
        [styles.active]: asPath === link,
      })}
    >
      <Link href={link}>
        <MaterialIcon name={icon} />
        <span>{t(title)}</span>
      </Link>
    </li>
  )
}
export default MenuItem
