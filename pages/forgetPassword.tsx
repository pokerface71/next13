import { useState } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangePassword, CodeOTP, LayoutHome, PhoneNumber } from 'components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
/* A Next.js feature that allows you to pre-render a page in advance instead of having to generate it
on every request. */
export const getStaticProps: GetStaticProps = async ({ locale='fa' }) => ({
	props: {
		...(await serverSideTranslations(locale as string, [
			'header',
			'common',
			'loginPage'
		]))
	}
})
const ForgetPassword: NextPage = () => {
	const router = useRouter()
	const [step, setStep] = useState<number>(1)
	const [informationForgetPassword, setInformationForgetPassword] =
		useState<IInformationForgetPassword>({
			mobile: null,
			code: null,
			password: null
		})
	return (
		<LayoutHome
			pageTitle='فراموشی رمز عبور'
			dir={router.locale === 'en' ? 'ltr' : 'rtl'}
		>
			<div className='container-fluid mt-5'>
				<div className='row justify-content-center'>
					<div className='col-md-3 col-12 mt-5'>
						{step === 1 && (
							<PhoneNumber
								pageType='forgetPassword'
								handleStepForgetPassword={setStep}
								setInformationForgetPassword={setInformationForgetPassword}
							/>
						)}
						{step === 2 && (
							<CodeOTP
								pageType='forgetPassword'
								handleStepForgetPassword={setStep}
								setInformationForgetPassword={setInformationForgetPassword}
								informationForgetPassword={informationForgetPassword}
							/>
						)}
						{step === 3 && (
							<ChangePassword
								pageType='forgetPassword'
								handleStepForgetPassword={setStep}
								setInformationForgetPassword={setInformationForgetPassword}
								informationForgetPassword={informationForgetPassword}
							/>
						)}
					</div>
				</div>
			</div>
		</LayoutHome>
	)
}

export default ForgetPassword
