import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript
} from 'next/document'
import Script from 'next/script'
import i18nextConfig from 'next-i18next.config'
class MyDocument extends Document {
	render() {
		const currentLocale =
		this.props.__NEXT_DATA__.locale || i18nextConfig.i18n.defaultLocale
		
		return (
			<Html lang={currentLocale}>
				<Head>
					<meta name='theme-color' content='#0c4dad' />
					<meta name='author' content='esmaeiljafari1992@gmail.com' />
					<meta name='apple-mobile-web-app-title' content='baaz' />
					<meta
						name='apple-mobile-web-app-status-bar-style'
						content='default'
					/>
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<link rel='icon' href='/favicon/favicon.ico' />
					<Script
						strategy='afterInteractive'
						async
						src={`https://www.googletagmanager.com/gtag/js?id=UA-105803922-1`}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag() { dataLayer.push(arguments) }
                                    gtag('js', new Date());
                                    gtag('config', 'UA-105803922-1');
                                        `
						}}
					/>
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/favicon/apple-touch-icon.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='/favicon/favicon-32x32.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='/favicon/favicon-16x16.png'
					/>
					<link rel='manifest' href='/favicon/site.webmanifest' />
					<meta name='msapplication-TileColor' content='#da532c' />
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}

	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx)

		return {
			...initialProps
		}
	}
}

export default MyDocument
