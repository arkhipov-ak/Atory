import { FC } from 'react'
import ReduxToastrLib from 'react-redux-toastr'

const ReduxToastr: FC = () => {
	return (
		<ReduxToastrLib
			newestOnTop={false}
			progressBar
			closeOnToastrClick
			timeOut={3000}
			transitionIn="fadeIn"
			transitionOut="fadeOut"
		/>
	)
}

export default ReduxToastr
