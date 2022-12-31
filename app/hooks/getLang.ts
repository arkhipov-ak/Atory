import { useIntl } from 'react-intl'

const t = (id: string) => {
	const intl = useIntl()
	return intl.formatMessage({ id })
}

export default t
