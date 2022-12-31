import dynamic from 'next/dynamic'

import { NextPageAuth } from '@/shared/types/auth.types'

const DynamicSettings = dynamic(
	() => import('@/components/screens/settings/Settings'),
	{
		ssr: false,
	}
)

const SettingsPage: NextPageAuth = () => {
	return <DynamicSettings />
}

export default SettingsPage
