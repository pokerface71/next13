import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, memo } from 'react'
import {
	Container,
	Dropdown,
	Nav,
	Navbar,
	NavDropdown,
	Offcanvas
} from 'react-bootstrap'
import {
	FiGlobe,
	FiLogOut,
	FiMenu,
	FiMoon,
	FiSun,
	FiUser
} from 'react-icons/fi'
import dynamic from 'next/dynamic'
import { useSelector, useDispatch } from 'react-redux'
import CustomToggleBtn from 'components/Custom/CustomToggleBtn/CustomToggleBtn'
import CustomImage from 'components/CustomImage/CustomImag'
import { setDarkMode } from 'store/reducers/globalState.reducer'
import { checkLogin, logOut } from 'tools/helpers'
import { useRequest } from 'ahooks'
import { logOutUser } from 'services/login/login.service'

const HeaderHome: FC = () => {
	const { t } = useTranslation(['header', 'common'])
	const router = useRouter()
	const selector = useSelector((state: any) => state.globalState)
	const dispatch = useDispatch()
	const checkLoginUser: boolean = checkLogin()
	const { run: runLogOut } = useRequest(logOutUser, {
		manual: true,
		onSuccess: () => {
			logOut()
		}
	})
	return (
		<Navbar
			expand='xl'
			suppressHydrationWarning={true}
			className={
				selector.darkMode ? 'darkModeMobile pt-3 ' : 'lightModeMobile pt-3 '
			}
			variant={selector.darkMode ? 'dark' : 'light'}
		>
			<Container fluid>
				<Navbar.Brand as='div'></Navbar.Brand>
				<Navbar.Toggle
					aria-controls={`offcanvasNavbar-expand-xl`}
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
					suppressHydrationWarning={true}
					as='div'
					id={`offcanvasNavbar-expand-xl`}
					aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
					placement={router.locale === 'fa' ? 'start' : 'end'}
				>
					<Offcanvas.Header
						className={selector.darkMode ? 'darkModeMobile' : 'lightModeMobile'}
						closeVariant={selector.darkMode ? 'white' : undefined}
						closeButton
						color='white'
					>
						<Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
							<CustomImage
								src='/images/baaz-logo-type.svg'
								height={29}
								width={40}
								alt=''
							/>
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body
						className={`${
							selector.darkMode ? 'darkModeMobile' : 'lightModeMobile'
						} align-items-center justify-content-between d-flex flex-column flex-lg-row`}
					>
						<Nav className='justify-content-md-center justify-content-start flex-grow-1'>
							<ul className='navbar-header-list d-flex align-items-center flex-column flex-lg-row mb-md-0'>
								<li className='nav-item'>
									{' '}
									<Link href='/' className={`navbar-header ${
												router.pathname === '/en' || router.pathname === '/'
													? 'is-active'
													: ''
											}`}>
										
											{t('Home')}
									
									</Link>
								</li>
								<li className='nav-item'>
									{' '}
									<Link href='/contact' 	className={`navbar-header ${
												router.pathname === '/contact' ? 'is-active' : ''
											}`}>
										
											{t('Contact')}
									
									</Link>
								</li>
								<li className='nav-item'>
									{' '}
									<Link href='/about' 	className={`navbar-header ${
												router.pathname === '/about' ? 'is-active' : ''
											}`}>
										
											{t('About')}
										
									</Link>
								</li>
								{!checkLoginUser && (
									<li className='nav-item'>
										{' '}
										<Link href='/login' 	className={`navbar-header ${
													router.pathname.includes('/login') ? 'is-active' : ''
												}`}>
										
												{t('Login / Register')}
											
										</Link>
									</li>
								)}
							</ul>
						</Nav>

						<div className='d-flex align-items-center justify-content-between'>
							{checkLoginUser && (
								<Dropdown>
									<Dropdown.Toggle as={CustomToggleBtn} className='btn'>
										<FiUser
											className={`${
												selector.darkMode ? 'darkMode' : 'lightMode'
											} font-24`}
										/>
									</Dropdown.Toggle>

									<Dropdown.Menu
										className={`${
											selector.darkMode ? 'darkMode' : 'lightMode'
										} navbar-dropdown-language mw-auto`}
									>
										<NavDropdown.Item as='div' className='p-2'>
											<Link href='/profile'>
												<span className='d-flex justify-content-start align-items-center cursor-pointer'>
													<FiMenu
														className={`${
															selector.darkMode ? 'colorDark' : 'colorLight'
														} font-24 mx-1`}
													/>
													<span
														className={
															selector.darkMode ? 'colorDark' : 'colorLight'
														}
													>
														{t('Profile')}
													</span>
												</span>
											</Link>
										</NavDropdown.Item>
										<NavDropdown.Item as='div' className='p-2'>
											<div
												className='d-flex justify-content-start align-items-center cursor-pointer'
												onClick={() => runLogOut()}
											>
												<FiLogOut
													className={`${
														selector.darkMode ? 'colorDark' : 'colorLight'
													} font-24 mx-1`}
												/>
												<div
													className={
														selector.darkMode ? 'colorDark' : 'colorLight'
													}
												>
													{' '}
													{t('LogOut')}
												</div>
											</div>
										</NavDropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							)}
							<Dropdown>
								<Dropdown.Toggle as={CustomToggleBtn} className='btn'>
									<FiGlobe
										className={`${
											selector.darkMode ? 'darkMode' : 'lightMode'
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

							<button className='btn'>
								{selector.darkMode ? (
									<FiSun
										className={`${
											selector.darkMode ? 'darkMode' : 'lightMode'
										} font-24`}
										onClick={() => dispatch(setDarkMode(false))}
									/>
								) : (
									<FiMoon
										className={`${
											selector.darkMode ? 'darkMode' : 'lightMode'
										} font-24`}
										onClick={() => dispatch(setDarkMode(true))}
									/>
								)}
							</button>
						</div>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)
}

export default dynamic(() => Promise.resolve(memo(HeaderHome)), { ssr: false })
