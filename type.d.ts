interface ILayoutProps {
	children: React.ReactNode
	pageTitle: string
	isFluid?: boolean
	metaName?: { name: string; content: string }[]
	canonical?: string
	prev?: string
	next?: string
	dir?: 'ltr' | 'rtl'
}
interface IResponseBackend {
	errors: any[]
	isFailed: boolean
	isSuccess: boolean
	reasons: any[]
	successes: any[]
}
interface ILoginResponseValue {
	firstName: string
	id: string
	jsonWebToken: {
		accessToken: string
		email: string
		expires: string
		isVerified: boolean
		permissions: []
		roles: string[]
		userId: string
		userManagmentId: number
	}
	lastName: string
	refreshToken: string
	username: string
}
interface ILoginResponse extends IResponseBackend {
	value: ILoginResponseValue
}
interface ISsrRequest {
	token: string
}
interface IInformationForgetPassword {
	mobile: string | null
	code: string | null
	password: string | null
}
interface IInformationForgetPasswordStep {
	handleStepForgetPassword: Dispatch<SetStateAction<number>>
	setInformationForgetPassword: Dispatch<
		SetStateAction<IInformationForgetPassword>
	>
	pageType?: 'forgetPassword' | 'register'
	informationForgetPassword?: IInformationForgetPassword
}
