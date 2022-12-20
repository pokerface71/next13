import {
	ButtonBaaz,
	CardBox,
	CustomImage,
	InputHookFormController,
	LayoutHome,
	LineVertical
} from 'components'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useRequest } from 'ahooks'
import { login } from 'services/login/login.service'
import { toast } from 'react-toastify'
import { loginCache } from 'tools/helpers'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setUserInfo } from 'store/reducers/globalState.reducer'
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
const Login: NextPage = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const { t } = useTranslation(['loginPage', 'common'])
	const { control, handleSubmit } = useForm()

	const { run: runLogin, loading } = useRequest(login, {
		manual: true,
		onSuccess: (data: ILoginResponse) => {
			try {
				dispatch(setUserInfo(data.value))
			} catch (error) {
				console.log({ error })
			} finally {
				loginCache(data, router)
			}
		},
		onError: (e) => {
			toast.error(`${e}`)
		}
	})
	const loginSubmit = (data: any) => {
		runLogin({
			userNameOrEmail: data?.userNameOrEmail,
			password: data?.password,
			remember: true
		})
	}
	return (
		<LayoutHome
			pageTitle='ورود به باز'
			isFluid
			dir={router.locale === 'en' ? 'ltr' : 'rtl'}
		>
			<div className='container-fluid mt-5'>
				<div className='row justify-content-center'>
					<div className='col-md-3  mt-5'>
						<CardBox
							classList='is-main-shadow rounded-2 border-0'
							classListBody='rounded-2'
						>
							<div className='login-page'>
								<form className='form' onSubmit={handleSubmit(loginSubmit)}>
									<div className='row justify-content-center'>
										<div className='col-md-12 text-center is-gray font-14 mt-3 mb-5'>
											{t('login with BAAZ')}
										</div>
										<div className='col-md-8 mb-2'>
											<InputHookFormController
												control={control}
												name='userNameOrEmail'
												type='text'
												placeholder={`${t('Enter UserName')}`}
												rules={{ required: true }}
												isLtr={router.locale === 'en'}
											/>
										</div>
										<div className='col-md-8 mb-3'>
											<InputHookFormController
												control={control}
												name='password'
												type='password'
												placeholder={`${t('Enter Password')}`}
												rules={{ required: true }}
												isLtr={router.locale === 'en'}
											/>
										</div>
										<div className='col-md-8 mb-3'>
											<ButtonBaaz
												label={t('Log In')}
												classList='btn btnTertiary w-100 font-12'
												type='submit'
											/>
										</div>
										<div className='col-md-8 mt-3 mb-5'>
											<CardBox
												classList='is-main-shadow rounded-2 border-0'
												classListBody='p-2 rounded-2'
											>
												<div className='d-flex justify-content-center cursor-pointer align-items-center'>
													<CustomImage
														src='/images/icons/google.png'
														width={23}
														height={23}
														alt={''}
													/>
													<p className='mb-0 font-12 mx-3'>
														{t('Continue With Google')}
													</p>
												</div>
											</CardBox>
										</div>
										<div className='col-md-8 mt-3 mb-2'>
											<LineVertical classList='w-100' />
										</div>
										<div className='col-md-8'>
											<div className='d-flex justify-content-start cursor-pointer mb-2'>
												<Link href='/register' className='font-12 mx-1 is-gray'>
													<span>
														<span className='font-12 mx-1 is-gray'>
															{t('Can’t Login ?')}
														</span>
														<span className='font-12 is-gray'>
															{t('Sign up for an Account')}
														</span>
													</span>
												</Link>
											</div>
										</div>
										<div className='col-md-8 mb-5'>
											<div className='d-flex justify-content-start cursor-pointer'>
												<Link href='/forgetPassword' className='font-12 mx-1 is-gray'>
											
														{t('Forget Password')}
												</Link>
											</div>
										</div>
									</div>
								</form>
							</div>
						</CardBox>
					</div>
				</div>
			</div>
		</LayoutHome>
	)
}

export default Login
