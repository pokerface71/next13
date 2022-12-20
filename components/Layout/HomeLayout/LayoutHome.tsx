import Head from 'next/head'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import HeaderHome from './HeadeHome'

const LayoutHome: FC<ILayoutProps> = ({
	children,
	pageTitle,
	metaName,
	canonical,
	prev,
	next,
	dir,
	isFluid
}) => {
	const selector = useSelector((state: any) => state.globalState)
	useEffect(() => {
		if (typeof window !== undefined) {
			document
				.querySelector('html')
				?.setAttribute(
					'class',
					`${selector.darkMode ? 'darkMode' : 'lightMode'}`
				)
			document
				.querySelector('body')
				?.setAttribute(
					'class',
					`${selector.darkMode ? 'darkMode' : 'lightMode'}`
				)
		}
	}, [selector])
	return (
		<div dir={dir ? dir : 'rtl'} className={`home-bg ${dir}`}>
			<Head>
				<title>{pageTitle}</title>
				{metaName &&
					metaName?.map((item, index: number) => (
						<meta key={index} name={item.name} content={item.content} />
					))}
				{canonical && <link rel='canonical' href={canonical} />}
				{prev && <link rel='prev' href={prev} />}
				{next && <link rel='next' href={next} />}
			</Head>
			<HeaderHome />
			<main className={isFluid ? 'container-fluid' : 'container'}>
				{children}
			</main>
		</div>
	)
}

export default LayoutHome
