import { getPlaylistsUrl } from 'config/url.config'
import dynamic from 'next/dynamic'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import { Gallery, SkeletonLoader } from '@/components/ui'

import { t } from '@/hooks/getLang'
import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/Meta'

import styles from './Profile.module.scss'
import { useProfile } from './useProfile'

const DynamicHeader = dynamic(() => import('@/components/ui/header/Header'), {
  ssr: false,
})

const Profile: FC = () => {
  const { profile, isLoading } = useProfile()
  const { user } = useAuth()

  return (
    <Meta title="Edit profile" description="Your profile">
      <Layout haveGradient="gradientBlue">
        <DynamicHeader
          subtitle="Profile"
          title={profile?.name || ''}
          description={`${profile?.playlists.length || '0'} ${t('Open playlists')}`}
          poster={profile?.poster}
          useFunc={useProfile}
          isEdit={user?._id === profile?._id}
        />
        {isLoading || !profile?.playlists ? (
          <SkeletonLoader
            count={7}
            className={styles.skeletonLoader}
            containerClassName={styles.containerLoader}
          />
        ) : (
          profile?.playlists.length > 0 && (
            <Gallery
              title="Playlists"
              data={profile.playlists}
              link={getPlaylistsUrl()}
              type="playlists"
            />
          )
        )}
      </Layout>
    </Meta>
  )
}
export default Profile
