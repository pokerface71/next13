import { CustomImage, LayoutHome } from 'components'
import type { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
/* A Next.js feature that allows you to pre-render a page in advance instead of having to generate it
on every request. */
export const getStaticProps: GetStaticProps = async ({ locale='fa' }) => ({
	props: {
		...(await serverSideTranslations(locale as string, ['header', 'footer']))
	}
})
const Home: NextPage = () => {
	const router = useRouter()
	return (
		<LayoutHome pageTitle='' dir={router.locale === 'en' ? 'ltr' : 'rtl'}>
			<div className='container'>
				<div className='d-grid justify-content-end mt-3'>
					<CustomImage src='/images/logoBaaz.svg' width={95} height={138} alt={''} />
				</div>
			</div>
		</LayoutHome>
	)
}
export default Home

