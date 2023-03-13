import Link from 'next/link'
import { FC } from 'react'
import { FormattedMessage } from 'react-intl'

import { useAuth } from '@/hooks/useAuth'

import styles from './User.module.scss'
import UserPopup from './UserPopup'

const User: FC = () => {
  const { user } = useAuth()

  return (
    <>
      {user ? (
        <UserPopup />
      ) : (
        <div className={styles.userLogin}>
          <Link href="/login">
            <FormattedMessage id="Login" />
          </Link>
          <Link href="/signup">
            <FormattedMessage id="SignUp" />
          </Link>
        </div>
      )}
    </>
  )
}
export default User
