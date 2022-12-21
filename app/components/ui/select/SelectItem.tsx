import { FC } from 'react'
import Select, { GroupBase, OptionsOrGroups, SingleValue } from 'react-select'

import t from '@/hooks/getLang'

import styles from './Select.module.scss'

interface ISelectItem {
	options: OptionsOrGroups<string, GroupBase<string>> | any
	defaultValue: string
	handleChange: (arg: SingleValue<string>) => void
	text: string
}

const SelectItem: FC<ISelectItem> = ({
	options,
	defaultValue,
	handleChange,
	text,
}) => {
	return (
		<div>
			<p>{t(text)}</p>
			<Select
				options={options}
				className={styles.select}
				onChange={(obj) => handleChange(obj)}
				isSearchable={false}
				defaultValue={defaultValue}
				name="lang"
				instanceId="select language"
			/>
		</div>
	)
}
export default SelectItem
