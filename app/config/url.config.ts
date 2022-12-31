export const getAuthorUrl = (slug: string) => `/author/${slug}`
export const getAuthorsUrl = () => '/authors'

export const getAlbumUrl = (slug: string) => `/album/${slug}`
export const getAlbumsUrl = () => '/albums'
export const getPopularAlbumsUrl = () => '/popular-albums'

export const getPlaylistUrl = (_id: string) => `/playlist/${_id}`
export const getPlaylistsUrl = () => `/playlists`
export const getAdminUrl = () => `/manage`
export const getAdminsUrl = (slug: string) => `/manage/${slug}`
