import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import t from '@/hooks/getLang'

interface IPlaylistItem {
	index: number
	name: string
	link: string
}

const PlaylistItem: FC<IPlaylistItem> = ({ index, name, link }) => {
	const { asPath } = useRouter()

	return (
		<li>
			<Link href={link}>
				<span
					className={cn({
						'text-white': asPath === link,
					})}
				>
					<span>{index + 1}. </span>
					{name === 'My playlist' ? t(name) : name}
				</span>
			</Link>
		</li>
	)
}
export default PlaylistItem
