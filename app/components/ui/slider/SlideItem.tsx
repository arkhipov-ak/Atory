import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';



import t from '@/hooks/getLang';



import { IAuthor } from '@/shared/types/track.types';



import Button from '../button/Button';



import styles from './Slider.module.scss';


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
				<Button text={buttonTitle} onClick={() => push(slide.link)} />
			</div>
		</div>
	)
}

export default SlideItem