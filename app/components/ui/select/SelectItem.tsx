import { FC } from 'react'
import Select, { GroupBase, OptionsOrGroups, SingleValue } from 'react-select'

import { IActive } from '@/components/screens/admin/newTrack/newTrack.interface'

import t from '@/hooks/getLang'

import styles from './Select.module.scss'

interface ISelectItem {
	options: OptionsOrGroups<string, GroupBase<string>> | any
	defaultValue: string | IActive[] | IActive
	handleChange: (arg: SingleValue<any>) => void
	text?: string
	isMulti?: boolean
}

const SelectItem: FC<ISelectItem> = ({
	options,
	defaultValue,
	handleChange,
	text,
	isMulti = false,
}) => {
	return (
		<div>
			{text && <p>{t(text)}</p>}
			<Select
				options={options}
				className={styles.select}
				onChange={(obj) => handleChange(obj)}
				isSearchable={false}
				isMulti={isMulti}
				placeholder={t('Select...')}
				defaultValue={defaultValue}
				name="lang"
				instanceId="select language"
			/>
		</div>
	)
}
export default SelectItem
