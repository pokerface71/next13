import CustomImage from 'components/CustomImage/CustomImag'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC, memo } from 'react'

const FooterMain: FC = () => {
	const { t } = useTranslation('header')
	return (
		<footer className='footer'>
			<section className='container'>
				<div className='footer__right-box'>
					<div className='footer__right-box__logo'>
						<CustomImage
							width={26}
							height={24}
							src='/images/logo-white-footer.webp'
							alt=''
						/>
					</div>
					<div className='footer__right-box__text'>
						{t('BAAZ.COM © 2021, ALL RIGHTS RESERVED')}
					</div>
				</div>
				<div className='footer__left-box'>
					<ul className='footer__left-box__list'>
						<li className='footer__left-box__list__li'>
							<Link href='/'>021 - 3615</Link>
						</li>
						<li className='footer__left-box__list__li'>
							<Link href='/'>info@baaz.com</Link>
						</li>
					</ul>
				</div>
			</section>
		</footer>
	)
}

export default dynamic(() => Promise.resolve(memo(FooterMain)), { ssr: false })
