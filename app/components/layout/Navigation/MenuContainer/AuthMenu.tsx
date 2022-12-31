import { getAdminUrl } from 'config/url.config'
import { FC } from 'react'

import { MaterialIcon } from '@/components/ui'

import t from '@/hooks/getLang'
import { useAuth } from '@/hooks/useAuth'

import MenuItem from '../MenuItem'

const AuthMenu: FC<{ handleData: () => void }> = ({ handleData }) => {
	const { user } = useAuth()

	return (
		<>
			{user?.isAdmin && (
				<MenuItem
					icon="MdOutlineLock"
					link={getAdminUrl()}
					title="Admin panel"
				/>
			)}
			{user && (
				<li>
					<a onClick={() => handleData()}>
						<MaterialIcon name="MdAdd" />
						<span>{t('Create playlist')}</span>
					</a>
				</li>
			)}
		</>
	)
}
export default AuthMenu
