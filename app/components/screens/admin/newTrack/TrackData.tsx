import { FC } from 'react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'

import { Button, Field, Heading } from '@/components/ui'
import UploadField from '@/components/ui/form-elements/UploadField/UploadFields'

import { t } from '@/hooks/getLang'

import { IData } from './newTrack.interface'

interface ITrackData {
  register: UseFormRegister<IData>
  control: Control<IData>
  nextPage: (arg: number) => void
}

const TrackData: FC<ITrackData> = ({ register, control, nextPage }) => {
  return (
    <div>
      <Heading title="Download the track" />
      <p>{t('Choose a cover - (png, jpg, jpeg, webp)')}</p>
      <Controller
        control={control}
        name="poster"
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <UploadField onChange={onChange} value={value} folder="tracks" />
        )}
      />
      <p>{t('Write the name of the track')}</p>
      <Field {...register('title')} style={{ width: '100%' }} placeholder="Name track" />
      <p>{t('Select track - (mp3)')}</p>
      <Controller
        control={control}
        name="trackUrl"
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <UploadField onChange={onChange} value={value} folder="tracks" accept=".mp3" isNoImage />
        )}
      />
      <p>{t('Specify track duration')}</p>
      <Field {...register('duration')} type="number" placeholder="Duration" />
      <Button text="Next" onClick={() => nextPage(1)} label="Next" />
    </div>
  )
}
export default TrackData
