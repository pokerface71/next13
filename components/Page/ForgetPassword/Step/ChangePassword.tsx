import CardBox from 'components/Card/CardBox'
import InputHookFormController from 'components/Inputs/InputHookFormController'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ButtonBaaz from 'components/Button/ButtonBaaz'
import { useRequest } from 'ahooks'
import { changePasswordByMobile } from 'services/forgetPassword/forgetPassword.service'
import dynamic from 'next/dynamic'

const ChangePassword: FC<IInformationForgetPasswordStep> = ({
	handleStepForgetPassword,
	informationForgetPassword,
	setInformationForgetPassword
}) => {
	const router = useRouter()
	const { t } = useTranslation('loginPage')
	const { control, handleSubmit } = useForm()
	const { run: runChangePasswordByMobile } = useRequest(
		changePasswordByMobile,
		{
			manual: true,
			onSuccess: (data: any) => {
				if (data.isSuccess) {
					router.push({
						pathname: '/login'
					})
				}
			}
		}
	)
	const loginChangePassword = (data: any) => {
		const information = {
			mobileNumber: informationForgetPassword?.mobile,
			newPassword: data.newPassword,
			confirmNewPassword: data.confirmNewPassword,
			verifyCode: informationForgetPassword?.code
		}
		runChangePasswordByMobile(information)
	}
	useEffect(() => {
		if (
			!informationForgetPassword?.mobile ||
			!informationForgetPassword?.code
		) {
			handleStepForgetPassword(1)
		}
	}, [handleStepForgetPassword, informationForgetPassword])
	return (
		<CardBox
			classList='is-main-shadow rounded-2 border-0'
			classListBody='rounded-2'
		>
			<div className='login-page'>
				<form className='form' onSubmit={handleSubmit(loginChangePassword)}>
					<div className='row justify-content-center'>
						<div className='col-md-12 text-center is-gray font-14 mt-3 mb-5'>
							{t('Forget Password with BAAZ')}
						</div>
						<div className='col-md-8 mb-2'>
							<InputHookFormController
								control={control}
								name='newPassword'
								type='password'
								placeholder={`${t('New Password')}`}
								rules={{ required: true }}
								isLtr={router.locale !== 'fa'}
							/>
						</div>
						<div className='col-md-8 mb-2'>
							<InputHookFormController
								control={control}
								name='confirmNewPassword'
								type='password'
								placeholder={`${t('Confirm New Password')}`}
								rules={{ required: true }}
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

export default dynamic(() => Promise.resolve(ChangePassword), { ssr: false })
