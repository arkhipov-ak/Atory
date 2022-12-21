import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

import t from '@/hooks/getLang'

import { IAuthor } from '@/shared/types/track.types'

import styles from './Slider.module.scss'

interface ISlideItem {
	slide: IAuthor
	buttonTitle?: string
}

const SlideItem: FC<ISlideItem> = ({ slide, buttonTitle = 'Watch' }) => {
	const { push } = useRouter()

	return (
		<div className={styles.slide}>
			{slide?.poster && (
				<Image
					src={slide?.bigPoster || slide.poster}
					layout="fill"
					priority
					className={styles.image}
					alt={slide.title}
					draggable={false}
				/>
			)}
			<div className={styles.content}>
				<div className={styles.heading}>{slide.title}</div>
				<div className={styles.subHeading}>
					{`${slide.amountPlays.toLocaleString()} ${t('Auditions')}, ${
						slide.countTracks
					} ${t('Tracks')}`}
				</div>
				<button className={styles.button} onClick={() => push(slide.link)}>
					{buttonTitle}
				</button>
			</div>
		</div>
	)
}

export default SlideItem
