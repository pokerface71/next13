import axios, { AxiosRequestConfig } from 'axios'
// import nextI18nextConfig from 'next-i18next.config'
import { toast } from 'react-toastify'
import { getToken } from 'tools/helpers'
// const currentLocale = nextI18nextConfig.i18n.defaultLocale
const initialHeaders: AxiosRequestConfig & {
	Authorization?: any
} = {
	headers: {
		'Content-Type': 'application/json-patch+json',
		accept: '/',
		// language: currentLocale || '',
		Authorization: getToken() ? `Bearer ${getToken()}` : ''
	}
}
const axiosInstance = axios.create(initialHeaders)
axiosInstance.interceptors.response.use(
	(response: any) => {
		return response
	},
	(error: any) => {
		if (error.response) {
			if (error.response.status === 400) {
				toast.error('خطایی در درخواست رخ داده است.')
			} else if (error.response.status === 401) {
				toast.error('هویت کاربر تایید نشده است.')
			} else if (error.response.status === 403) {
				toast.error('شما مجاز به این درخواست نمی‌باشید.')
			} else if (error.response.status === 406) {
				toast.error('شما مجوز دسترسی به سرویس مورد نظر را ندارید.')
			} else if (error.response.status === 404) {
				toast.error('api مورد نظر یافت نشد.')
			} else if (error.response.status === 417) {
				toast.error(`${error.response.data.Reasons[0].Message}`)
			} else if (error.response.status === 500) {
				console.error(
					'error 500 ',
					`===> ${error.response.data.Reasons[0].Message}`
				)
				toast.error('سرور با مشکل مواجه شده است لطفا مجدد تلاش کنید.')
			}
		} else {
			toast.error('خطایی رخ داده است لطفا مجدد تلاش کنید.')
		}
		return Promise.reject(error)
	}
)

export default axiosInstance
