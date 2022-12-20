import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/* Checking if the user is trying to access the pages. */
const isValidUser = (req: NextRequest) => {
	const guardRouteUrls = ['/profile/', '/cart/']
	const { cookies, nextUrl } = req
	/* Checking if the user is trying to access the pages. */
	if (guardRouteUrls.includes(nextUrl.pathname)) {
		if (cookies && cookies?.get('token')) {
			return true
		} else {
			return false
		}
	}
	return true
}
const urlsNotAccessAfterLogin = (req: NextRequest) => {
	const routeUrls = ['/login/', '/forgetPassword/', '/register/']
	const { cookies, nextUrl } = req
	/* Checking if the user is trying to access the pages. */
	if (routeUrls.includes(nextUrl.pathname)) {
		if (cookies && cookies?.get('token')) {
			return false
		} else {
			return true
		}
	}
	return true
}

export async function middleware(request: NextRequest) {
	const { nextUrl } = request
	// console.log('object', request.headers.get('accept') === '*/*')
	if (isValidUser(request)) {
		//allow request to go through
		if (urlsNotAccessAfterLogin(request)) {
			return NextResponse.next()
		} else {
			return NextResponse.redirect(new URL(`${nextUrl.origin}/`))
		}
	} else {
		/* It's redirecting the user to the login page. */
		return NextResponse.redirect(
			new URL(`${nextUrl.origin}/login?prev=${nextUrl.pathname}`)
		)
	}
}
