import { useCountDown, useRequest } from 'ahooks'
import ButtonBaaz from 'components/Button/ButtonBaaz'
import CardBox from 'components/Card/CardBox'
import InputHookFormController from 'components/Inputs/InputHookFormController'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { verifyCodeForMobile } from 'services/forgetPassword/forgetPassword.service'
import { ConvertorSecondToMinuteAndSecond } from 'tools/convertor'

const CodeOTP: FC<IInformationForgetPasswordStep> = ({
	pageType,
	handleStepForgetPassword,
	informationForgetPassword,
	setInformationForgetPassword
}) => {
	const router = useRouter()
	/* Setting the initial value of the countdown timer to 2 minutes from the current time. */
	const [targetDate, setTargetDate] = useState<number>(Date.now() + 120000)
	const { control, handleSubmit } = useForm()
	const { t } = useTranslation('loginPage')
	const { run: runVerifyCodeForMobile } = useRequest(verifyCodeForMobile, {
		manual: true,
		onSuccess: (data) => {
			if (data.isSuccess) {
				handleStepForgetPassword(3)
			}
		}
	})
	const loginOTPCode = (data: any) => {
		const information = {
			code: data.insertCode,
			mobile: informationForgetPassword?.mobile
		}
		runVerifyCodeForMobile(information)
		setInformationForgetPassword((prevState: any) => ({
			...prevState,
			code: data.insertCode
		}))
	}
	/* A countdown timer. */
	const [countdown] = useCountDown({
		targetDate: targetDate
	})
	return (
		<CardBox
			classList='is-main-shadow rounded-2 border-0'
			classListBody='rounded-2'
		>
			<div className='login-page'>
				<form className='form' onSubmit={handleSubmit(loginOTPCode)}>
					<div className='row justify-content-center'>
						<div className='col-md-12 text-center is-gray font-14 mt-3 mb-5'>
							{pageType === 'forgetPassword'
								? t('Forget Password with BAAZ')
								: t('Sign Up In BAAZ')}
						</div>
						<div className='col-md-8 mb-2'>
							<InputHookFormController
								control={control}
								name='insertCode'
								autocomplete='one-time-code'
								type='text'
								placeholder={`${t('Insert Code')}`}
								rules={{ required: true, maxLength: 5, minLength: 5 }}
								isLtr={router.locale !== 'fa'}
							/>
						</div>
						<div className='col-md-8 mb-2'>
							<p
								className={`${
									countdown === 0 ? 'cursor-pointer' : ''
								} text-center font-12`}
								onClick={() => {
									countdown === 0 ? setTargetDate(Date.now() + 120000) : null
								}}
								dir={router.locale === 'fa' ? 'rtl' : 'ltr'}
							>
								{' '}
								{countdown === 0 ? (
									`${t('Try Again')}`
								) : (
									<span>
										<b className='font-weight-bold mx-1'>
											{/* A function that converts seconds to minutes : seconds. */}
											{`${ConvertorSecondToMinuteAndSecond(
												Math.round(countdown / 1000)
											)} `}
										</b>
										<span className='font-10'>{`${t(
											'Wait until the code is retrieved'
										)}`}</span>
									</span>
								)}
							</p>
						</div>
						<div className='col-md-8 mb-3'>
							<ButtonBaaz
								label={t('Confirm')}
								classList='btn btnTertiary w-100 font-12'
								type='submit'
							/>
						</div>
					</div>
				</form>
			</div>
		</CardBox>
	)
}

export default dynamic(() => Promise.resolve(CodeOTP), { ssr: false })
