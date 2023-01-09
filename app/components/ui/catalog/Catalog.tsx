import dynamic from 'next/dynamic'
import { FC } from 'react'
import { IoMdTime } from 'react-icons/io'

import { t } from '@/hooks/getLang'

import { ITrack } from '@/shared/types/track.types'

import Heading from '../heading/Heading'

import styles from './Catalog.module.scss'

const CatalogItem = dynamic(() => import('./CatalogItem'), { ssr: false })

interface ICatalogProps {
	tracks: ITrack[] | undefined
	title?: string
	playlistId?: string
}

const Catalog: FC<ICatalogProps> = ({ tracks, title, playlistId = '' }) => {
	return (
		<div className={styles.catalogWrapper}>
			{title && <Heading title={title} />}
			<div className={styles.tableHeader}>
				<span>#</span>
				<span>{t('Name')}</span>
				<span>{t('Album')}</span>
				<span>{t('Number of listenings')}</span>
				<span>
					<IoMdTime />
				</span>
			</div>
			<div className={styles.catalog}>
				<ul className={styles.table}>
					{tracks &&
						tracks.map((track: ITrack, i: number) => (
							<CatalogItem
								key={i}
								index={i}
								{...track}
								allTracks={tracks}
								playlistId={playlistId}
							/>
						))}
				</ul>
			</div>
		</div>
	)
}

export default Catalog
