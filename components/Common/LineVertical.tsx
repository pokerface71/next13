import { FC } from 'react'
type LineVerticalProps = {
	classList?: string
}

const LineVertical: FC<LineVerticalProps> = ({ classList }) => {
	return (
		<div
			className={`${classList || ''} h-1px reverse-mode-bg
			}`}
		></div>
	)
}

export default LineVertical
