import { FC } from 'react'

import t from '@/hooks/getLang'

import style from './Button.module.scss'

interface IButton {
	text: string
	onClick?: (arg?: any) => void
}

const Button: FC<IButton> = ({ text, onClick }) => {
	return (
		<button className={style.button} onClick={onClick}>
			{t(text)}
		</button>
	)
}
export default Button
