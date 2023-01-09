import cn from 'clsx'
import { getAlbumUrl, getAuthorUrl } from 'config/url.config'
import Link from 'next/link'
import { FC, useRef, useState } from 'react'
import { AiOutlineEllipsis } from 'react-icons/ai'

import { usePlaylist } from '@/components/screens/playlist/usePlaylist'

import { clickOutside } from '@/hooks/clickOutside'
import { t } from '@/hooks/getLang'
import { useAuth } from '@/hooks/useAuth'

import { IAlbum, IAuthor } from '@/shared/types/track.types'

import MaterialIcon from '../MaterialIcon'

import styles from './Navigation.module.scss'
import { useNavigation } from './useNavigation'

interface INavigation {
	id?: string
	album?: IAlbum[]
	author?: IAuthor[]
	isEdit?: boolean
	openModal?: (arg: boolean) => void
	handleDelete?: (arg: string) => void
	playlistId?: string
}

const Navigation: FC<INavigation> = ({
	id,
	author,
	album,
	isEdit = false,
	openModal,
	handleDelete,
	playlistId,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)

	clickOutside(menuRef, () => {
		setIsOpen(false)
	})

	const { mutateAsync } = useNavigation(id || '')
	const { queryData: playlists } = usePlaylist()
	const { user } = useAuth()

	return (
		<div
			className={cn(styles.navigation)}
			onClick={() => setIsOpen(!isOpen)}
			ref={menuRef}
		>
			<AiOutlineEllipsis />
			<div className={cn(styles.modal, { '!block': isOpen })}>
				{author && author?.length > 0 && (
					<div className={styles.modalWrapper}>
						<p>{t('To the artist')}</p>
						<MaterialIcon name="MdArrowRight" />
						<div className={styles.modalBlock}>
							{author.map((author, i) => (
								<div key={i}>
									<Link href={getAuthorUrl(author.slug)} key={i}>
										{author.title}
									</Link>
								</div>
							))}
						</div>
					</div>
				)}
				{album && album?.length > 0 && (
					<div>
						<Link href={getAlbumUrl(album[0].slug)}>
							<p>{t('To the album')}</p>
						</Link>
					</div>
				)}
				{playlistId && (
					<div onClick={() => mutateAsync(playlistId)}>
						<p>{t('Remove track from playlist')}</p>
					</div>
				)}
				{user && !playlistId && !isEdit && playlists?.data?.length ? (
					<div className={styles.modalWrapper}>
						<p>{t('Add to playlist')}</p>
						<MaterialIcon name="MdArrowRight" />
						<div className={styles.modalBlock}>
							{playlists.data?.map((playlist, i) => (
								<div
									key={i}
									onClick={() => mutateAsync(playlist._id)}
									aria-label="Add playlist"
								>
									<p>
										<span>{i + 1}. </span>
										{playlist.name === 'My playlist'
											? t(playlist.name)
											: playlist.name}
									</p>
								</div>
							))}
						</div>
					</div>
				) : (
					<span />
				)}
				{isEdit && (
					<>
						{handleDelete && (
							<button
								onClick={() => handleDelete(id || '')}
								aria-label="Delete playlist"
							>
								<p>{t('Delete playlist')}</p>
							</button>
						)}
						<button
							onClick={() => openModal && openModal(true)}
							aria-label="Change information"
						>
							<p>{t('Change information')}</p>
						</button>
					</>
				)}
			</div>
		</div>
	)
}
export default Navigation
