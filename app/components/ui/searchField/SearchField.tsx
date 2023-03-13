import { ChangeEvent, FC } from 'react'

import { t } from '@/hooks/getLang'

import MaterialIcon from '../MaterialIcon'

import styles from './SearchField.module.scss'

interface ISearchField {
  searchTerm: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => {
  return (
    <div className={styles.search}>
      <MaterialIcon name="MdSearch" />
      <input
        placeholder={t('Search for song, artist, album...')}
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  )
}
export default SearchField
