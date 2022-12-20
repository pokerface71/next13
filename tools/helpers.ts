import Cookies from 'js-cookie'

/**
 * If the document exists, return true if the class attribute of the html element is equal to
 * 'darkMode', otherwise return false.
 * @returns A function that returns a boolean.
 */
export const checkDarKMode = (): void | boolean => {
	if (typeof document !== undefined) {
		return (
			(document?.querySelector('html') as HTMLHtmlElement)?.getAttribute(
				'class'
			) === 'darkMode'
		)
	}
}
/**
 * It returns the value of the cookie named 'token' if it exists, otherwise it returns undefined
 * @returns A string or undefined
 */
export const getToken = (): string | undefined => {
	return Cookies.get('token')
}
/**
 * This function takes an object that has a property called value, which is an object that has a
 * property called jsonWebToken, which is an object that has a property called accessToken, and then
 * sets a cookie with that value.
 * @param {ILoginResponse} response - ILoginResponse
 */
const setLoginData = (response: ILoginResponse) => {
	Cookies.set('token', response.value.jsonWebToken.accessToken, {
		expires: 1
	})
}
/**
 * It takes a response object and a router object, and then it sets the login data and redirects to the
 * previous page.
 * @param {ILoginResponse} response - ILoginResponse
 * @param {any} router - any
 */
export const loginCache = async (response: ILoginResponse, router: any) => {
	await setLoginData(response)
	window.location.replace(`${router?.query?.prev ? router.query.prev : '/'}`)
}
/**
 * This function removes the token from the cookie and the global state from the local storage, then
 * redirects the user to the home page.
 */
export const logOut = async () => {
	await Cookies.remove('token')
	await localStorage.removeItem('globalState')
	window.location.replace('/')
}
/**
 * If the token cookie exists, return true, otherwise return false.
 * @returns A function that returns a boolean value.
 */
export const checkLogin = () => {
	return Cookies.get('token') ? true : false
}
