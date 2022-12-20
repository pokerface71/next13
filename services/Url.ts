// mainUrlApiSite is url for api site
const mainUrlApiSite = process.env.apiGateWay
// tak manager
// const takManager = `${mainUrlApiSite}:8098`
const identity = `${mainUrlApiSite}/api/v1/identity`
const files = `${mainUrlApiSite}/api/v1/filemanager`
// =========================================================================
export const proxyServerUrl = {
	mainApi: `${mainUrlApiSite}/api/`,
	// identity
	forgetPasswordSendCodeToMobile: `${identity}/ForgetPasswordSendCodeToMobile`,
	sendEmailVerificationCode: `${identity}/send-email-verification-code`,
	changePasswordByMobile: `${identity}/ChangePasswordByMobile`,
	verifyCodeForMobile: `${identity}/VerifyCodeForMobile`,
	logOut: `${identity}/logOut`,
	login: `${identity}/login`,
	register: `${identity}/users`,
	// files
	uploadFile: `${files}/file/upload`,
	uploadImage: `${files}/Image/Upload`,
	uploadVoice: `${files}/file/Voices`
}
