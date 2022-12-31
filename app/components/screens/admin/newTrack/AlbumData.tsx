import { FC } from 'react'
import {
	Control,
	Controller,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form'

import { Button, Field, Heading, Select, SlugField } from '@/components/ui'
import UploadField from '@/components/ui/form-elements/UploadField/UploadFields'

import t from '@/hooks/getLang'

import { generateSlug } from '@/utils/string/generateSlug'

import styles from './NewTrack.module.scss'
import { IActive, IData } from './newTrack.interface'

interface IAlbumData {
	options: IActive[] | undefined
	defaultValue: IActive | ''
	handleChange: (arg: IActive) => void
	control: Control<IData>
	register: UseFormRegister<IData>
	setValue: UseFormSetValue<IData>
	getValues: UseFormGetValues<IData>
}

const AlbumData: FC<IAlbumData> = ({
	options,
	defaultValue,
	handleChange,
	control,
	register,
	setValue,
	getValues,
}) => {
	return (
		<div>
			<Heading title="Choose an album" />
			<Select
				options={options}
				defaultValue={defaultValue}
				handleChange={handleChange}
			/>
			<p className={styles.separator}>{t('Or create a new one-Album')}</p>
			<p>{t('Choose a cover - (png, jpg, jpeg, webp)')}</p>
			<Controller
				control={control}
				name="posterAlbum"
				defaultValue=""
				render={({ field: { value, onChange } }) => (
					<UploadField onChange={onChange} value={value} folder="tracks" />
				)}
			/>
			<p>{t('Specify the album')}</p>
			<Field {...register('titleAlbum')} placeholder="Album" />
			<SlugField
				register={register}
				name="slugAlbum"
				generate={() =>
					setValue('slugAlbum', generateSlug(getValues('titleAlbum')))
				}
			/>
			<Button text="Create" />
		</div>
	)
}
export default AlbumData
