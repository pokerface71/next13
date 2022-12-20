import { AxiosRequestConfig } from 'axios'
import axiosInstance from '../axiosInstance'
import { proxyServerUrl } from '../Url'

// ===============register====================
type TRegister = {
	userManagmentId?: number
	firstName?: string
	lastName?: string
	userName?: string
	email: string
	password: string
	confirmPassword?: string
	mobileNumber: string
	roles?: string[]
}
export const register = ({
	userManagmentId,
	firstName,
	lastName,
	userName,
	email,
	password,
	confirmPassword,
	mobileNumber,
	roles
}: TRegister) => {
	const data = {
		userManagmentId,
		firstName,
		lastName,
		userName,
		email,
		password,
		confirmPassword,
		mobileNumber,
		roles
	}
	const reqConfig: AxiosRequestConfig = {
		method: 'POST',
		url: proxyServerUrl.register,
		data
	}
	return axiosInstance(reqConfig).then((res) => res.data)
}
