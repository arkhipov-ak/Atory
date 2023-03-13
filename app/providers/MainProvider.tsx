import dynamic from 'next/dynamic'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { store } from 'store/store'

import { ReduxToastr } from '@/components/ui'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import AuthProvider from './AuthProvider/AuthProvider'
import HeaderProvider from './HeadProvider/HeaderProvider'
import LangProvider from './LangProvider/LangProvider'

const DynamicPlayer = dynamic(() => import('@/components/ui/player/PlayerContainer'), {
  ssr: false,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const MainProvider: FC<TypeComponentAuthFields> = ({ children, Component }) => {
  return (
    <HeaderProvider>
      <Provider store={store}>
        <LangProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider Component={Component}>{children}</AuthProvider>
            <DynamicPlayer />
            <ReduxToastr />
          </QueryClientProvider>
        </LangProvider>
      </Provider>
    </HeaderProvider>
  )
}

export default MainProvider
