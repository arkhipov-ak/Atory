import { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { IData } from '@/components/screens/admin/newTrack/newTrack.interface'

import { t } from '@/hooks/getLang'

import Field from '../Field'

import styles from './SlugField.module.scss'

interface ISlugField {
  register: UseFormRegister<IData>
  generate: () => void
  name: 'slugAuthor' | 'slugAlbum'
}

const SlugFIeld: FC<ISlugField> = ({ generate, register, name }) => {
  return (
    <div className={styles.wrapper}>
      <Field {...register(name)} placeholder="Slug" />
      <div className={styles.badge} onClick={generate}>
        {t('Generate')}
      </div>
    </div>
  )
}
export default SlugFIeld
