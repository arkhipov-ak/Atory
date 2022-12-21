import { FC } from 'react'

const Favicons: FC = () => {
	return (
		<>
			<link
				rel="shortcut icon"
				href="/favicons/favicon.ico"
				type="image/x-icon"
			/>
			<link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
		</>
	)
}

export default Favicons
