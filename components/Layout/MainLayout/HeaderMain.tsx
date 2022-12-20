import { FC, memo } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import {
	Container,
	Dropdown,
	Nav,
	Navbar,
	NavDropdown,
	Offcanvas
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import CustomImage from 'components/CustomImage/CustomImag'
import {
	FiGlobe,
	FiMenu,
	FiMoon,
	FiShoppingCart,
	FiSun,
	FiUser
} from 'react-icons/fi'
import { useTranslation } from 'next-i18next'
import { setDarkMode } from 'store/reducers/globalState.reducer'
import Link from 'next/link'
import CustomToggleBtn from 'components/Custom/CustomToggleBtn/CustomToggleBtn'

const HeaderMain: FC = () => {
	const [t] = useTranslation('header')
	const router = useRouter()
	const dispatch = useDispatch()
	const selector = useSelector((state: any) => state.globalState)
	return (
		<Navbar
			bg={selector.darkMode ? 'dark' : 'white'}
			color={selector.darkMode ? 'colorDark' : 'colorLight'}
			variant={selector.darkMode ? 'dark' : 'light'}
			expand='false'
			fixed='top'
			className='box-shadow-main header-main'
		>
			<Container fluid>
				<Navbar.Toggle
					aria-controls={`offcanvasNavbar-expand-private`}
					as='div'
					className='p-1'
				>
					<button
						type='button'
						className='navbar-toggle collapsed'
						data-toggle='collapse'
						data-target='#bs-example-navbar-collapse-1'
					>
						<FiMenu className='font-24' />
					</button>
				</Navbar.Toggle>
				<Navbar.Offcanvas
					id={`offcanvasNavbar-expand-private`}
					aria-labelledby={`offcanvasNavbarLabel-expand-private`}
					placement={router.locale === 'fa' ? 'end' : 'start'}
				>
					<Offcanvas.Header
						className={selector.darkMode ? 'darkMode' : ''}
						closeButton
						closeVariant={selector.darkMode ? 'white' : undefined}
					>
						<Offcanvas.Title id={`offcanvasNavbarLabel-expand-private`}>
							{selector.darkMode ? (
								<CustomImage
									src='/images/logo-baaz-white.webp'
									height={33}
									alt='baaz'
									width={119}
									loading='lazy'
								/>
							) : (
								<CustomImage
									src='/images/logo-baaz.webp'
									height={33}
									width={119}
									alt='baaz'
									loading='lazy'
								/>
							)}
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body
						className={`align-items-center justify-content-between d-flex flex-column ${
							selector.darkMode ? 'darkMode' : '	'
						}`}
					>
						<Nav className='justify-content-md-center justify-content-start flex-grow-1'>
							<ul className='navbar-header-list d-flex align-items-center flex-column mb-md-0 p-0'>
								<li className='nav-item mb-3'>
									{' '}
									<Link href='/' 	className={`navbar-header ${
												router.pathname === '/en' || router.pathname === '/'
													? 'is-active'
													: ''
											}`}>
									
											{t('Home')}
									
									</Link>
								</li>
								<li className='nav-item mb-3'>
									{' '}
									<Link href='/contact' className={`navbar-header ${
												router.pathname === '/contact' ? 'is-active' : ''
											}`}>
										
											{t('Contact')}
									</Link>
								</li>
								<li className='nav-item mb-3'>
									{' '}
									<Link href='/about' className={`navbar-header ${
												router.pathname === '/about' ? 'is-active' : ''
											}`}>
										
											{t('About')}
										
									</Link>
								</li>
							</ul>
						</Nav>

						<div className='d-flex justify-content-center flex-column align-items-center'>
							<div className='d-flex align-items-center justify-content-between'>
								<div className='user-info d-flex align-items-center'>
									<div className='user-avatar'>
										<div className='user-avatar-icon cursor-pointer'>
											{selector.darkMode ? (
												<FiSun
													className='font-24'
													onClick={() => dispatch(setDarkMode(false))}
												/>
											) : (
												<FiMoon
													className='font-24'
													onClick={() => dispatch(setDarkMode(true))}
												/>
											)}
										</div>
									</div>
									<div className='user-name'></div>
								</div>
								<div className='language-switcher mx-2'>
									<Dropdown>
										<Dropdown.Toggle as={CustomToggleBtn} className='btn'>
											<FiGlobe
												className={`${
													selector.darkMode ? 'text-white' : ''
												} font-24`}
											/>
										</Dropdown.Toggle>

										<Dropdown.Menu
											className={`${
												selector.darkMode ? 'darkMode' : 'lightMode'
											} navbar-dropdown-language mw-auto`}
										>
											<NavDropdown.Item as='div'>
												<Link href={router.asPath} locale='fa'>
													{t('Persian')}
												</Link>
											</NavDropdown.Item>
											<NavDropdown.Item as='div'>
												<Link href={`/en${router.asPath}`} locale='en'>
													{t('English')}
												</Link>{' '}
											</NavDropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</div>
							</div>
							<p className='font-10 mt-3 mb-0'>
								{t('Version')} : {process.env.NEXT_APP_VERSION}
							</p>
						</div>
					</Offcanvas.Body>
				</Navbar.Offcanvas>

				<Navbar.Brand>
					{selector.darkMode ? (
						<CustomImage
							src='/images/logo-baaz-white.webp'
							height={33}
							width={119}
							loading='lazy'
							alt='baaz'
							href='/'
						/>
					) : (
						<CustomImage
							src='/images/logo-baaz.webp'
							height={33}
							width={119}
							alt='baaz'
							loading='lazy'
							href='/'
						/>
					)}
				</Navbar.Brand>
				<div className='navbar-icons'>
					<div className='call-header'>
						<Link className='' href='tel:3516'>
							{t('Call Number 3516')}
						</Link>
					</div>
					<div className='cart-icon'>
						<FiShoppingCart className='font-24' />
					</div>
					<div className='profile-icon'>
						<Link href='/profile'>
							
								<FiUser className='font-24' />
							
						</Link>
					</div>
				</div>
			</Container>
		</Navbar>
	)
}

export default dynamic(() => Promise.resolve(memo(HeaderMain)), { ssr: false })
