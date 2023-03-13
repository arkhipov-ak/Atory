import { siteName, titleMerge } from 'config/seo.config'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { t } from '@/hooks/getLang'

import logoImage from '@/assets/images/logo.png'

import { onlyText } from './string/clearText'

interface IMeta {
  title?: string
  description?: string
  image?: any
  children: React.ReactNode
}

const Meta: FC<IMeta> = ({
  title = 'Listen music online',
  description = 'Listen to popular music right in your browser',
  image = null,
  children,
}) => {
  const { asPath } = useRouter()
  const currentUrl = `${process.env.APP_URL}${asPath}`

  return (
    <>
      <Head>
        <title itemProp="headline">{titleMerge(t(title))}</title>
        <meta itemProp="description" name="description" content={onlyText(t(description), 152)} />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:locale" content="en" />
        <meta property="og:title" content={titleMerge(t(title))} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={image || logoImage} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:description" content={onlyText(t(description), 197)} />
      </Head>
      {children}
    </>
  )
}
export default Meta
