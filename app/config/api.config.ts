export const API_URL = `${process.env.APP_URL}/api`
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}`

export const getAuthUrl = (string: string) => `/auth${string}`
export const getUserUrl = (string: string) => `/user${string}`
export const getTrackUrl = (string: string) => `/track${string}`
export const getAlbumUrl = (string: string) => `/album${string}`
export const getPlaylistUrl = (string: string) => `/playlist${string}`
export const getAuthorUrl = (string: string) => `/author${string}`
