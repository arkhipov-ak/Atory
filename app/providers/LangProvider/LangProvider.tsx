import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { IntlProvider } from 'react-intl'

import en from '../../../lang/en.json'
import ru from '../../../lang/ru.json'

interface ILangProvider {
	children: React.ReactNode
}
const messages: any = {
	ru,
	en,
}

const LangProvider: FC<ILangProvider> = ({ children }) => {
	const { locale, asPath, push, pathname } = useRouter()

	if (!locale) return null

	useEffect(() => {
		const lang = Cookies.get('language')
		if (lang && asPath.split('/').pop() !== '[id]' && pathname !== '/404') {
			push(asPath, undefined, { locale: JSON.parse(lang).locale })
		}
	}, [])

	if (!locale) return null
	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			{children}
		</IntlProvider>
	)
}

export default LangProvider
