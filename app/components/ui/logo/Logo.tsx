import Image from 'next/image'
import { FC } from 'react'

import logoImg from '@/assets/images/logo.png'

const Logo: FC<{ isBig?: boolean }> = ({ isBig = false }) => {
	return (
		<div>
			<Image
				src={logoImg}
				width={isBig ? 220 : 130}
				height={isBig ? 60 : 32}
				alt="Atory logo"
				draggable={false}
			/>
		</div>
	)
}
export default Logo
