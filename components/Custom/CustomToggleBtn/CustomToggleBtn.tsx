import { forwardRef, ReactNode } from 'react'
interface ICustomToggle {
	children?: ReactNode
	onClick: (e: any) => void
}
type Ref = HTMLButtonElement
// eslint-disable-next-line react/display-name
const CustomToggleBtn = forwardRef<Ref, ICustomToggle>(
	({ children, onClick }, ref) => (
		<button
			ref={ref}
			onClick={(e: any) => {
				e.preventDefault()
				onClick(e)
			}}
			className='btn p-1 mx-2'
		>
			{children}
		</button>
	)
)

export default CustomToggleBtn
