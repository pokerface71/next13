export interface IButton {
	label: string
	classList?: string
	onClick?: () => void
	style?: Record<string, string>
	isDisabled?: boolean
	children?: React.ReactElement | React.ReactElement[]
	svg?: string
	type?: 'button' | 'submit' | 'reset'
}

const Button = ({
	classList,
	onClick,
	label,
	style,
	isDisabled,
	children,
	type
}: IButton): JSX.Element => {
	return (
		<button
			className={`btn btn-border ${classList} ${
				children ? 'position-relative' : ''
			}`}
			onClick={onClick}
			style={style}
			type={type || 'button'}
			disabled={isDisabled}
		>
			<span>{label}</span>
			{children}
		</button>
	)
}
export default Button
