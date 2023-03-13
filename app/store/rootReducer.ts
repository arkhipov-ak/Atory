import { reducer as toastrReducer } from 'react-redux-toastr'

import musicReducer from './music/music.slice'
import { reducer as userReducer } from './user/user.slice'

export const reducers = {
  user: userReducer,
  toastr: toastrReducer,
  music: musicReducer,
}
