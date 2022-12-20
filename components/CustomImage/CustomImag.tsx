import Image, { ImageProps } from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
interface ILoaderImage {
	src: string
	width: string | number
	quality?: number
}
interface ICustomImageProps extends ImageProps {
	parenClass?: string
	isSkeleton?: boolean
	href?: string
}
const myLoader = ({ src, width, quality }: ILoaderImage) => {
	return `${src}?w=${width}&q=${quality || 75}`
}

const CustomImage: FC<ICustomImageProps> = ({
	parenClass,
	isSkeleton = false,
	href,
	src,
	alt,
	...props
}) => {
	const router = useRouter()
	return (
		<div
			className={`custom-image ${parenClass || ''} ${
				href ? 'cursor-pointer' : ''
			}`}
			onClick={() => (href ? router.push(href) : null)}
		>
			<picture className='d-flex align-items-center justify-content-center'>
				{isSkeleton ? (
					<Image
						loader={myLoader}
						src={src || '/images/notFound.jpg'}
						{...props}
						placeholder='blur'
						blurDataURL='/images/notFound.jpg'
						alt={alt}
					/>
				) : (
					<Image
						loader={myLoader}
						src={src || '/images/notFound.jpg'}
						{...props}
						alt={alt}
					/>
				)}
			</picture>
		</div>
	)
}

export default CustomImage
