import '../styles/main.scss'
import type { AppProps } from 'next/app'
import storeWrapper from '../store'
import { Router, useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { appWithTranslation } from 'next-i18next'
import * as ga from '../tools/google'
import 'react-toastify/dist/ReactToastify.css'
import 'nprogress/nprogress.css'
import '../public/fonts/IRANSansFa/css/style.css'
import '../styles/main.scss'
import { ErrorBoundary } from 'components'
import { ToastContainer } from 'react-toastify'
import nextI18nextConfig from 'next-i18next.config'
// Binding events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	useEffect(() => {
		const handleRouteChange = (url: URL) => {
			console.log = function () {}
			ga.pageView(url)
		}
		// When the component is mounted, subscribe to router changes
		// and log those page views
		router.events.on('routeChangeComplete', handleRouteChange)

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router.events])
	return (
		<ErrorBoundary>
			<Component {...pageProps} key={router.asPath} />
			<ToastContainer
				position='bottom-right'
				autoClose={
					process?.env?.timeAutoCloseToast
						? +process.env.timeAutoCloseToast
						: 5000
				}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={router.locale === 'fa'}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</ErrorBoundary>
	)
}

export default storeWrapper.withRedux(
	appWithTranslation(MyApp, nextI18nextConfig)
)

