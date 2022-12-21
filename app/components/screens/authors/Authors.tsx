import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import { Gallery } from '@/components/ui'

import Meta from '@/utils/Meta'

import { IAuthorsPage } from '../../../../pages/authors'

const Authors: FC<IAuthorsPage> = ({ authors }) => {
	return (
		<Meta
			title="Listen music online"
			description="Listen to popular music right in your browser"
		>
			<Layout haveGradient="gradientBlue">
				<Gallery
					data={authors}
					title="Most popular artists"
					type="authors"
					isWrap
				/>
			</Layout>
		</Meta>
	)
}

export default Authors
