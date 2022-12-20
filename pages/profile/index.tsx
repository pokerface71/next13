import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { LayoutMain, SideBarMenu } from 'components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
/* A Next.js feature that allows you to pre-render a page in advance instead of having to generate it
on every request. */
export const getStaticProps: GetStaticProps = async ({ locale='fa' }) => ({
	props: {
		...(await serverSideTranslations(locale as string, [
			'header',
			'common',
			'profile'
		]))
	}
})
const Profile: NextPage = () => {
	const router = useRouter()
	const { profileTab } = router.query
	return (
		<LayoutMain
			pageTitle='پروفایل'
			isFluid
			dir={router.locale === 'en' ? 'ltr' : 'rtl'}
		>
			<section className='row'>
				<SideBarMenu
					tab={profileTab ?? 'account-information'}
					classList='col-sm-6 col-md-4 col-lg-3 col-xl-2 profile-sidebar-menu'
				/>
			</section>
		</LayoutMain>
	)
}

export default Profile
