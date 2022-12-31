import { FC } from 'react'
import Select, { GroupBase, OptionsOrGroups, SingleValue } from 'react-select'

import t from '@/hooks/getLang'

import styles from './Select.module.scss'

interface ISelectItem {
	options: OptionsOrGroups<string, GroupBase<string>> | any
	defaultValue: any
	handleChange: (arg: SingleValue<any>) => void
	text?: string
	isTranslate?: boolean
	isMulti?: boolean
}

const SelectItem: FC<ISelectItem> = ({
	options,
	defaultValue,
	handleChange,
	text,
	isTranslate = false,
	isMulti = false,
}) => {
	if (isTranslate) {
		defaultValue.label = t(
			defaultValue.value.charAt(0).toUpperCase() + defaultValue.value.slice(1)
		)
	}

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
