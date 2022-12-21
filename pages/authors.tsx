import { getAuthorUrl } from 'config/url.config'
import { GetStaticProps, NextPage } from 'next'

import Authors from '@/components/screens/authors/Authors'

import { IAuthor } from '@/shared/types/track.types'

import { AuthorService } from '@/services/author.service'

export interface IAuthorsPage {
	authors: IAuthor[]
}

const AuthorsPage: NextPage<IAuthorsPage> = ({ authors }) => {
	return <Authors authors={authors} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: author } = await AuthorService.getAll()

		const authors = author.map((author) => ({
			...author,
			link: getAuthorUrl(author.slug),
		}))

		return {
			props: {
				authors,
			},
			revalidate: 60,
		}
	} catch (err) {
		return {
			props: {
				authors: [],
			},
		}
	}
}
export default AuthorsPage
