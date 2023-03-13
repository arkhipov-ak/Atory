import { errorCatch } from 'api/api.helpers'
import { toastr } from 'react-redux-toastr'

export const toastrError = async (error: any, title?: string) => {
  const message = errorCatch(error)
  toastr.error(title || 'Error', message)
  throw error
}

export const toastrErrorT = (errorText: string, errorTitle: string) => {
  toastr.error(errorTitle, errorText)
  throw errorText
}
