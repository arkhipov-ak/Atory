import { getAuthorUrl } from 'config/url.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IAlbum, IAuthor } from '@/shared/types/track.types'

import styles from './Player.module.scss'
import { useUpdateCountOpened } from './useUpdateCountOpened'

type IPlayer = Omit<IAlbum, 'link'>

const Player: FC<IPlayer> = ({ poster, author, title, _id }) => {
	useUpdateCountOpened(_id)

	return (
		<div className={styles.info}>
			<Image
				src={poster}
				width={56}
				height={56}
				alt="Track poster"
				draggable={false}
			/>
			<div>
				<p>{title}</p>
				<div>
					{author.map((author: IAuthor, i: number) => (
						<Link key={i} href={getAuthorUrl(author.slug)}>
							{author.title}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
export default Player
