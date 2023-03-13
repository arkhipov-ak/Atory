import { getAlbumUrl, getAuthorUrl, getPlaylistUrl } from 'config/url.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { IoMdMusicalNotes } from 'react-icons/io'

import { t } from '@/hooks/getLang'

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

const GalleryItem: FC<IGalleryProps> = ({ title, name, poster, author, slug, _id, type }) => {
  console.log(poster)
  return (
    <Link
      className={styles.block}
      href={
        type === 'playlists'
          ? getPlaylistUrl(_id)
          : type === 'authors'
          ? getAuthorUrl(slug)
          : getAlbumUrl(slug)
      }
    >
      <div>
        {poster ? (
          <Image
            src={poster}
            fill
            sizes="(max-width: 600px) 130px,
										(max-width: 400px) 100px,"
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
          ? +author[0]?.title?.length > 0 &&
            author.map((author: IAuthor) => author?.title).join(', ')
          : t('Performer')}
      </span>
    </Link>
  )
}
export default GalleryItem
