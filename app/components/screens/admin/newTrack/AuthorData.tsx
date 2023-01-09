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

import { t } from '@/hooks/getLang'

import { generateSlug } from '@/utils/string/generateSlug'

import styles from './NewTrack.module.scss'
import { IActive, IData } from './newTrack.interface'

interface IAuthorData {
	options: IActive[] | undefined
	defaultValue: IActive[] | ''
	handleChange: (arg: IActive[]) => void
	control: Control<IData>
	register: UseFormRegister<IData>
	setValue: UseFormSetValue<IData>
	getValues: UseFormGetValues<IData>
	nextPage: (arg: number) => void
}

const AuthorData: FC<IAuthorData> = ({
	options,
	defaultValue,
	handleChange,
	control,
	register,
	setValue,
	getValues,
	nextPage,
}) => {
	return (
		<div>
			<Heading title="Specify the author" />
			<Select
				options={options}
				defaultValue={defaultValue}
				handleChange={handleChange}
				isMulti
			/>
			<p className={styles.separator}>{t('Or create a new one')}</p>
			<p>{t('Choose a cover - (png, jpg, jpeg, webp)')}</p>
			<Controller
				control={control}
				name="posterAuthor"
				defaultValue=""
				render={({ field: { value, onChange } }) => (
					<UploadField onChange={onChange} value={value} folder="tracks" />
				)}
			/>
			<p>{t('Specify the author')}</p>
			<Field
				{...register('titleAuthor', {
					required: 'Author is required',
				})}
				placeholder="Author"
			/>
			<SlugField
				register={register}
				name="slugAuthor"
				generate={() =>
					setValue('slugAuthor', generateSlug(getValues('titleAuthor')))
				}
			/>
			<Button text="Next" onClick={() => nextPage(2)} label="Next" />
		</div>
	)
}
export default AuthorData
