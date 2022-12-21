import cn from 'classnames'
import Image from 'next/image'
import { FC } from 'react'
import { HiOutlinePencil } from 'react-icons/hi'

import t from '@/hooks/getLang'

import MaterialIcon from '../../MaterialIcon'
import SkeletonLoader from '../../SkeletonLoader'

import styles from './UploadFields.module.scss'
import { useUpload } from './useUpload'

interface IUploadField {
	folder?: string
	value?: string
	onChange: () => void
	style?: string
	isNoImage?: boolean
}

const UploadField: FC<IUploadField> = ({
	onChange,
	folder,
	isNoImage = false,
	value,
}) => {
	const { isLoading, uploadFile } = useUpload(onChange, folder)

	return (
		<div className={cn(styles.field)}>
			<div className={styles.shadow}></div>
			<input type="file" onChange={uploadFile} />
			{!isNoImage && (
				<div className={styles.uploadImage}>
					{isLoading ? (
						<SkeletonLoader count={1} className="w-full h-full" />
					) : value ? (
						<Image
							src={value}
							layout="fill"
							draggable={false}
							alt="Avatar"
							unoptimized
						/>
					) : (
						<MaterialIcon name="MdPersonOutline" />
					)}
				</div>
			)}
			<div className={styles.edit}>
				<HiOutlinePencil />
				<p>{t('Select photo')}</p>
			</div>
		</div>
	)
}
export default UploadField
