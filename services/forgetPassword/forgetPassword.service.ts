import { AxiosRequestConfig } from 'axios'
import axiosInstance from '../axiosInstance'
import { proxyServerUrl } from '../Url'

// ===============forgetPassword====================
type forgetPasswordSendCodeToMobileProps = {
	userNameOrEmail: string
	password: string
	remember: boolean
	userMobileNumber: string
	verifyCode: string
}

export const forgetPasswordSendCodeToMobile = (
	userMobileNumber: forgetPasswordSendCodeToMobileProps
) => {
	const data = {
		mobileNumber: userMobileNumber
	}
	const reqConfig: AxiosRequestConfig = {
		method: 'POST',
		url: proxyServerUrl.forgetPasswordSendCodeToMobile,
		data
	}
	return axiosInstance(reqConfig).then((res) => res.data)
}
// ===============verifyCodeForMobile====================
export const verifyCodeForMobile = (data: any) => {
	const reqConfig: AxiosRequestConfig = {
		method: 'POST',
		url: proxyServerUrl.verifyCodeForMobile,
		data
	}
	return axiosInstance(reqConfig).then((res) => res.data)
}
// ===============changePasswordByMobile====================
export const changePasswordByMobile = (data: any) => {
	const reqConfig: AxiosRequestConfig = {
		method: 'POST',
		url: proxyServerUrl.changePasswordByMobile,
		data
	}
	return axiosInstance(reqConfig).then((res) => res.data)
}
// ===============changePasswordByMobile====================
