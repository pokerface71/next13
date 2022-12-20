import Head from 'next/head'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import FooterMain from './FooterMain'
import HeaderMain from './HeaderMain'

const LayoutMain: FC<ILayoutProps> = ({
	children,
	pageTitle,
	isFluid,
	metaName,
	canonical,
	prev,
	next,
	dir
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
		<div dir={dir ? dir : 'rtl'} className={` ${dir}`}>
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
			<HeaderMain />
			<main
				className={
					isFluid
						? 'container-fluid main-content-into'
						: 'container main-content-into'
				}
			>
				{children}
			</main>
			<FooterMain />
		</div>
	)
}

export default LayoutMain
