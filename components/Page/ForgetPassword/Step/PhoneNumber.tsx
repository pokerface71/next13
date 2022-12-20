import { useRequest } from 'ahooks'
import ButtonBaaz from 'components/Button/ButtonBaaz'
import CardBox from 'components/Card/CardBox'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import InputHookFormController from 'components/Inputs/InputHookFormController'
import { forgetPasswordSendCodeToMobile } from 'services/forgetPassword/forgetPassword.service'
import { useTranslation } from 'next-i18next'

const PhoneNumber: FC<IInformationForgetPasswordStep> = ({
	pageType,
	handleStepForgetPassword,
	setInformationForgetPassword
}) => {
	const router = useRouter()
	const { control, handleSubmit } = useForm()
	const { t } = useTranslation('loginPage')
	const { run: runForgetPasswordSendCodeToMobile } = useRequest(
		forgetPasswordSendCodeToMobile,
		{
			manual: true,
			onSuccess: (data) => {
				if (data.isSuccess) {
					handleStepForgetPassword(2)
				}
			}
		}
	)
	const loginPhoneNumber = (data: any) => {
		runForgetPasswordSendCodeToMobile(data.EnterPhoneNumber)
		setInformationForgetPassword((prevState: IInformationForgetPassword) => ({
			...prevState,
			mobile: data.EnterPhoneNumber
		}))
	}
	return (
		<CardBox
			classList='is-main-shadow rounded-2 border-0'
			classListBody='rounded-2'
		>
			<div className='login-page'>
				<form className='form' onSubmit={handleSubmit(loginPhoneNumber)}>
					<div className='row justify-content-center'>
						<div className='col-md-12 text-center is-gray font-14 mt-3 mb-5'>
							{pageType === 'forgetPassword'
								? t('Forget Password with BAAZ')
								: t('Sign Up In BAAZ')}
						</div>
						<div className='col-md-8 mb-2'>
							<InputHookFormController
								control={control}
								name='EnterPhoneNumber'
								type='text'
								placeholder={`${t('Enter Phone Number')}`}
								rules={{ required: true, maxLength: 11, minLength: 11 }}
								isLtr={router.locale !== 'fa'}
							/>
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

export default PhoneNumber
