import { Card } from 'react-bootstrap'
type CardBoxProps = {
	children: React.ReactNode
	title?: string
	classList?: string
	classListBody?: string
	onClick?: () => void
}
const CardBox = ({
	children,
	title,
	classList,
	classListBody,
	onClick
}: CardBoxProps) => {
	return (
		<Card className={`dark-light-bg ${classList}`} onClick={onClick}>
			{title && <Card.Header>{title}</Card.Header>}
			<Card.Body className={`${classListBody || ''}`}>{children}</Card.Body>
		</Card>
	)
}

export default CardBox
