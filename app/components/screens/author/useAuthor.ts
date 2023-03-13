import { getAlbumUrl } from 'config/url.config'
import { useQuery } from 'react-query'

import { IAlbum } from '@/shared/types/track.types'

import { AuthorService } from '@/services/author.service'

export const useAuthor = (slug: string) => {
  const queryData = useQuery('get albums by author', () => AuthorService.getBySlugAlbums(slug), {
    select: ({ data }) =>
      data[0].albums.map((album: IAlbum) => ({
        ...album,
        link: getAlbumUrl(album.slug),
      })),
  })
  return queryData
}
