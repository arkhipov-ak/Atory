import { useIntl } from 'react-intl'

export const t = (id: string) => {
	const intl = useIntl()
	return intl.formatMessage({ id })
}

