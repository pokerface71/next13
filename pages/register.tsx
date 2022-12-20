import { GetStaticProps, NextPage } from 'next'
import { ChangePassword, CodeOTP, LayoutHome, PhoneNumber } from 'components'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
/* A Next.js feature that allows you to pre-render a page in advance instead of having to generate it
on every request. */
export const getStaticProps: GetStaticProps = async ({ locale ='fa'}) => ({
	props: {
		...(await serverSideTranslations(locale as string, [
			'header',
			'common',
			'loginPage'
		]))
	}
})
const Register: NextPage = () => {
	const [step, setStep] = useState<number>(1)
	const [informationRegister, setInformationRegister] =
		useState<IInformationForgetPassword>({
			mobile: null,
			code: null,
			password: null
		})
	const { t } = useTranslation('loginPage')
	const router = useRouter()

	return (
		<LayoutHome
			pageTitle='ثبت نام'
			isFluid
			dir={router.locale === 'en' ? 'ltr' : 'rtl'}
		>
			<div className='container-fluid mt-5'>
				<div className='row justify-content-center'>
					<div className='col-md-3 col-12 mt-5'>
						{step === 1 && (
							<PhoneNumber
								pageType='register'
								handleStepForgetPassword={setStep}
								setInformationForgetPassword={setInformationRegister}
							/>
						)}
						{step === 2 && (
							<CodeOTP
								pageType='register'
								handleStepForgetPassword={setStep}
								setInformationForgetPassword={setInformationRegister}
								informationForgetPassword={informationRegister}
							/>
						)}
						{step === 3 && (
							<ChangePassword
								pageType='register'
								handleStepForgetPassword={setStep}
								setInformationForgetPassword={setInformationRegister}
								informationForgetPassword={informationRegister}
							/>
						)}
					</div>
				</div>
			</div>
		</LayoutHome>
	)
}

export default Register
