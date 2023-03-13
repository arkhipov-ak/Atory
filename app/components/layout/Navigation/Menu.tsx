import dynamic from 'next/dynamic'
import { FC } from 'react'

import { IMenu } from './menu.interface'

const DynamicMenuItem = dynamic(() => import('./MenuItem'), {
  ssr: false,
})

const Menu: FC<{ menu: IMenu }> = ({ menu: { items } }) => {
  return (
    <>
      {items.map((item) => (
        <DynamicMenuItem key={item.link} {...item} />
      ))}
    </>
  )
}

export default Menu
