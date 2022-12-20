import { LayoutHome } from 'components'
import type { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

const About: NextPage = () => {
	const router = useRouter()
	return (
		<LayoutHome
			pageTitle='تماس با ما'
			dir={router.locale === 'en' ? 'ltr' : 'rtl'}
		>
			About
		</LayoutHome>
	)
}

/* A Next.js feature that allows you to pre-render a page in advance instead of having to generate it
on every request. */
export const getStaticProps: GetStaticProps = async ({ locale ='fa'}) => ({
	props: {
		...(await serverSideTranslations(locale as string, ['header', 'footer']))
	}
})

export default About
