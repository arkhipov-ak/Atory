import { FC } from 'react'

import { MaterialIcon } from '@/components/ui'

import t from '@/hooks/getLang'
import { useAuth } from '@/hooks/useAuth'

const AuthMenu: FC<{ handleData: () => void }> = ({ handleData }) => {
	const { user } = useAuth()

	return (
		<>
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
