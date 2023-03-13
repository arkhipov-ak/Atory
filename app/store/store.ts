import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { reducers } from './rootReducer'

export const store = configureStore({
  reducer: reducers,
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
