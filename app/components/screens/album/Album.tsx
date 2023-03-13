import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import { Catalog, Header } from '@/components/ui'

import { t } from '@/hooks/getLang'

import { IAuthor, ITrack } from '@/shared/types/track.types'

import Meta from '@/utils/Meta'
import { fmtMSSNamed } from '@/utils/string/fmtMSS'

interface IAlbum {
  title: string
  poster: string
  totalDuration: number
  data: ITrack[]
  author: IAuthor[]
}

const Album: FC<IAlbum> = ({ title, poster, totalDuration, data, author }) => {
  return (
    <Meta>
      <Layout poster={poster}>
        <Header
          subtitle="Album"
          title={title}
          poster={poster}
          description={`${data.length} ${data.length > 1 ? t('Tracks') : t('Track')}, ${fmtMSSNamed(
            totalDuration,
          )}`}
          author={author}
        />
        <Catalog tracks={data} />
      </Layout>
    </Meta>
  )
}
export default Album
