import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { useDebounce } from '@/hooks/useDebounce'

import { AlbumService } from '@/services/album.service'
import { AuthorService } from '@/services/author.service'
import { TrackService } from '@/services/track.service'

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const tracks = useQuery(
    ['search track list', debouncedSearch],
    () => TrackService.getAll(debouncedSearch),
    {
      select: ({ data }) => data,
      enabled: !!debouncedSearch,
    },
  )

  const authors = useQuery(
    ['search author list', debouncedSearch],
    () => AuthorService.getAll(debouncedSearch),
    {
      select: ({ data }) => data,
      enabled: !!debouncedSearch,
    },
  )

  const albums = useQuery(
    ['search album list', debouncedSearch],
    () => AlbumService.getAll(debouncedSearch),
    {
      select: ({ data }) => data,
      enabled: !!debouncedSearch,
    },
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return { handleSearch, searchTerm, tracks, authors, albums }
}

export default useSearch
