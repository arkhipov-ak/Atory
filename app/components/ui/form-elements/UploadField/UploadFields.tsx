import Image, { StaticImageData } from 'next/image'
import { FC } from 'react'
import { HiOutlinePencil } from 'react-icons/hi'

import { t } from '@/hooks/getLang'

import MaterialIcon from '../../MaterialIcon'
import SkeletonLoader from '../../SkeletonLoader'

import styles from './UploadFields.module.scss'
import { useUpload } from './useUpload'

interface IUploadField {
  folder?: string
  value: string | StaticImageData
  onChange: () => void
  style?: string
  error?: any
  isNoImage?: boolean
  accept?: string
}

const UploadField: FC<IUploadField> = ({
  onChange,
  folder,
  error,
  isNoImage = false,
  accept = 'image/*',
  value,
}) => {
  const { isLoading, uploadFile } = useUpload(onChange, folder)

  return (
    <div className={isNoImage ? styles.fieldImg : styles.field}>
      <input type="file" onChange={uploadFile} accept={accept} />
      {error && <div className={styles.error}>{error.message}</div>}
      {!isNoImage && (
        <>
          <div className={styles.shadow} />
          <div className={styles.uploadImage}>
            {isLoading ? (
              <SkeletonLoader
                count={1}
                className={styles.skeletonLoader}
                containerClassName={styles.containerLoader}
              />
            ) : value ? (
              <Image src={value} layout="fill" draggable={false} alt="Avatar" unoptimized />
            ) : (
              <MaterialIcon name="MdPersonOutline" />
            )}
          </div>
          <div className={styles.edit}>
            <HiOutlinePencil />
            <p>{t('Select photo')}</p>
          </div>
        </>
      )}
    </div>
  )
}
export default UploadField
