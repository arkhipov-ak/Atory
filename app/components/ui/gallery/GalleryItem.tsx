import { getAuthorUrl, getPlaylistUrl } from 'config/url.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { IoMdMusicalNotes } from 'react-icons/io'

import t from '@/hooks/getLang'

import { IAuthor } from '@/shared/types/track.types'

import MaterialIcon from '../MaterialIcon'

import styles from './Gallery.module.scss'

interface IGalleryProps {
	title?: string
	name?: string
	poster: string
	author?: IAuthor[]
	link: string
	slug: string
	_id: string
	type: string
}

const GalleryItem: FC<IGalleryProps> = ({
	title,
	name,
	poster,
	author,
	link,
	slug,
	_id,
	type,
}) => {
	return (
		<Link
			className={styles.block}
			href={
				link
					? link
					: type === 'playlist'
					? getPlaylistUrl(_id)
					: getAuthorUrl(slug)
			}
		>
			<div>
				{poster ? (
					<Image
						src={poster}
						height={150}
						width={150}
						className={author ? '' : 'rounded-full'}
						alt="Album poster"
						draggable={false}
					/>
				) : (
					<div className={styles.emptyAvatar}>
						<IoMdMusicalNotes />
					</div>
				)}
				<MaterialIcon name="MdPlayCircle" />
			</div>
			<p>{title ? title : name}</p>
			<span>
				{author
					? author
							.map((author: IAuthor) => author?.title || author?.name)
							.join(', ')
					: t('Performer')}
			</span>
		</Link>
	)
}
export default GalleryItem
