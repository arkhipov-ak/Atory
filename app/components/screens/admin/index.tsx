import { getAdminsUrl } from 'config/url.config'
import Link from 'next/link'

import Layout from '@/components/layout/Layout'
import { Button, Heading } from '@/components/ui'

import Meta from '@/utils/Meta'

const Admin = () => {
	return (
		<Meta>
			<Layout>
				<div>
					<Heading title="New track" />
					<Link href={getAdminsUrl('new-track')}>
						<Button text="Create new track" label='Create track' />
					</Link>
				</div>
			</Layout>
		</Meta>
	)
}
export default Admin
