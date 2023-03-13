import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import Layout from '@/components/layout/Layout'

import Meta from '@/utils/Meta'

import AlbumData from './AlbumData'
import AuthorData from './AuthorData'
import styles from './NewTrack.module.scss'
import TrackData from './TrackData'
import { IActive, IData } from './newTrack.interface'
import { useNewTrack } from './useNewTrack'

const NewTrack: FC = () => {
  const { onSubmit, authors, albums } = useNewTrack()

  let [page, setPage] = useState(0)
  const [activeActor, setActiveActor] = useState<IActive[] | ''>('')
  const [activeAlbum, setActiveAlbum] = useState<IActive | ''>('')

  const { handleSubmit, register, control, getValues, setValue } = useForm<IData>({
    mode: 'onChange',
  })

  const handleChangeActor = (data: IActive[]) => {
    setValue('authorId', [...data.map((author) => author.id)])
    setActiveActor(data)
  }

  const handleChangeAlbum = (data: IActive) => {
    setValue('albumId', data.id)
    setActiveAlbum(data)
  }

  return (
    <Meta>
      <Layout>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {page === 0 ? (
            <TrackData register={register} control={control} nextPage={setPage} />
          ) : page === 1 ? (
            <AuthorData
              options={authors}
              defaultValue={activeActor}
              handleChange={handleChangeActor}
              control={control}
              register={register}
              setValue={setValue}
              getValues={getValues}
              nextPage={setPage}
            />
          ) : (
            <AlbumData
              options={albums}
              defaultValue={activeAlbum}
              handleChange={handleChangeAlbum}
              control={control}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
          )}
        </form>
      </Layout>
    </Meta>
  )
}
export default NewTrack
