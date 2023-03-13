import { FC } from 'react'

import { SearchField } from '@/components/ui'

import useSearch from './useSearch'

const Search: FC = () => {
  const { handleSearch, searchTerm } = useSearch()

  return <SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
}
export default Search
