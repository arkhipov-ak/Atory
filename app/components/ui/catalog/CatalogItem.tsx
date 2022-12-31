import { getAlbumUrl, getAuthorUrl } from 'config/url.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	getActiveTrackId,
	getActiveTrackIndex,
	getIsPlayingTrack,
} from '@/shared/selectors/selectors'
import { IAlbum, IAuthor, ITrack } from '@/shared/types/track.types'

import EqualizerGif from '@/assets/images/equalizer-animated-green.gif'

import { fmtMSS } from '@/utils/string/fmtMSS'

import {
	setActiveId,
	setActiveIndex,
	setActivePlaylist,
	setIsPlaying,
} from '@/store/music/music.slice'

import MaterialIcon from '../MaterialIcon'
import Navigation from '../navigation/Navigation'

import styles from './Catalog.module.scss'
import FavoriteItem from './favoriteButton/FavoriteItem'

interface ICatalogItem extends ITrack {
	index: number
	allTracks: ITrack[]
	playlistId: string
}

const CatalogItem: FC<ICatalogItem> = ({
	allTracks,
	index,
	countPlays,
	poster,
	title,
	author,
	album,
	duration,
	_id,
	playlistId,
}) => {
	const dispatch = useDispatch()

	const isPlaying = useSelector(getIsPlayingTrack)
	const activeId = useSelector(getActiveTrackId)
	const activeIndex = useSelector(getActiveTrackIndex)

	const handlePlayAudio = () => {
		dispatch(setActiveIndex(index))
		dispatch(setActiveId(_id))
		dispatch(setIsPlaying(!isPlaying))
		dispatch(setActivePlaylist(allTracks))
	}

	return (
		<li>
			<div className={styles.playWrapper}>
				{isPlaying && _id === activeId && activeIndex === index ? (
					<Image
						src={EqualizerGif}
						width={20}
						height={20}
						alt="Equaliser"
						draggable={false}
					/>
				) : (
					<p>{(parseInt(String(index), 10) + 101).toString().substr(1)}</p> // 0 to 01, 2 to 02...
				)}
				<span className={styles.playIndicator} onClick={handlePlayAudio}>
					{isPlaying && _id === activeId && activeIndex === index ? (
						<MaterialIcon name="MdPause" />
					) : (
						<MaterialIcon name="MdPlayArrow" />
					)}
				</span>
			</div>
			<div>
				<Image
					src={poster}
					width={50}
					height={50}
					alt="track cover"
					draggable={false}
				/>
				<div>
					<p>{title}</p>
					<p>
						{author.map((author: IAuthor, i: number) => (
							<Link key={i} href={getAuthorUrl(author.slug)}>
								{author.title}
							</Link>
						))}
					</p>
				</div>
			</div>
			<div>
				<p>
					{album.map((album: IAlbum, i: number) => (
						<Link key={i} href={getAlbumUrl(album.slug)}>
							{album.title}
						</Link>
					))}
				</p>
			</div>
			<div>
				<p>{countPlays?.toLocaleString()}</p>
			</div>
			<div>
				<FavoriteItem trackId={_id} />
				<p>{fmtMSS(duration)}</p>
				<Navigation
					id={_id}
					author={author}
					album={album}
					playlistId={playlistId}
				/>
			</div>
		</li>
	)
}
export default CatalogItem
