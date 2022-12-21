import { getAuthorUrl } from 'config/url.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { FavoriteButton } from '@/components/ui'

import { useAuth } from '@/hooks/useAuth'

import { IAlbum, IAuthor } from '@/shared/types/track.types'

import styles from './Player.module.scss'
import { useUpdateCountOpened } from './useUpdateCountOpened'

type IPlayer = Omit<IAlbum, 'link'>

const Player: FC<IPlayer> = ({ poster, author, title, slug, _id }) => {
	const { user } = useAuth()
	useUpdateCountOpened(slug)

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
			{user && <FavoriteButton trackId={_id} />}
		</div>
	)
}
export default Player
