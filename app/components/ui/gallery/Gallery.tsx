import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import { t } from '@/hooks/getLang'

import { IAlbum, IAuthor, IPlaylist } from '@/shared/types/track.types'

import Heading from '../heading/Heading'

import styles from './Gallery.module.scss'
import GalleryItem from './GalleryItem'

interface IGalleryProps {
	title: string
	data: IAlbum[] | IAuthor[] | IPlaylist[] | undefined
	link?: string
	type: string
	isWrap?: boolean
}

const Gallery: FC<IGalleryProps> = ({
	title,
	data,
	type,
	isWrap = false,
	link,
}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.heading}>
				<Heading title={title} />
				{!isWrap && link && <Link href={link}>{t('See all')}</Link>}
			</div>
			<div
				className={cn(styles.gallery, {
					[styles.galleryHidden]: !isWrap,
				})}
			>
				{data &&
					data.map((obj, i) => <GalleryItem {...obj} key={i} type={type} />)}
			</div>
		</div>
	)
}
export default Gallery
