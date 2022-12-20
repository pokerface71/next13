import { FC, memo } from 'react'
import { Spinner } from 'react-bootstrap'

const Loading: FC = () => {
	return (
		<div className='loading-box'>
			<Spinner animation='grow' variant='success' />
			<Spinner animation='grow' variant='danger' />
			<Spinner animation='grow' variant='warning' />
		</div>
	)
}

export default memo(Loading)
