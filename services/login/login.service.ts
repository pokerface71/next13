import { AxiosRequestConfig } from 'axios'
import axiosInstance from '../axiosInstance'
import { proxyServerUrl } from '../Url'

// ===============login====================
type LoginProps = {
	userNameOrEmail: string
	password: string
	remember: boolean
}
export const login = ({ userNameOrEmail, password, remember }: LoginProps) => {
	const data = {
		userNameOrEmail,
		password,
		remember
	}
	const reqConfig: AxiosRequestConfig = {
		method: 'POST',
		url: proxyServerUrl.login,
		data
	}
	return axiosInstance(reqConfig).then((res) => res.data)
}

// ===============logOut====================
export const logOutUser = () => {
	const reqConfig: AxiosRequestConfig = {
		method: 'POST',
		url: proxyServerUrl.logOut
	}
	return axiosInstance(reqConfig).then((res) => res.data)
}
