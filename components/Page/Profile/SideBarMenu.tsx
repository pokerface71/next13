import { useRequest } from 'ahooks'
import CardBox from 'components/Card/CardBox'
import CustomImage from 'components/CustomImage/CustomImag'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, Fragment, memo, useState } from 'react'
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { logOutUser } from 'services/login/login.service'
import { logOut } from 'tools/helpers'
import { menuSidebarLinks } from 'tools/staticList'
import LinkSidebarMenu from './LinkSidebarMenu'
type TSideBarMenu = {
	classList?: string
	tab?: string | string[]
}
const SideBarMenu: FC<TSideBarMenu> = ({ tab, classList }) => {
	const { t } = useTranslation('profile')
	const [showMenu, setShowMenu] = useState<boolean>(false)
	const router = useRouter()
	const selector = useSelector((state: any) => state.globalState)
	const { run: runLogOut } = useRequest(logOutUser, {
		manual: true,
		onSuccess: () => {
			logOut()
		}
	})
	return (
		<div className={`${classList ? classList : ''}`}>
			<CardBox
				classList='is-main-shadow rounded-2 border-0'
				classListBody='rounded-2'
			>
				<div className='profile-sidebar'>
					<div className='profile-sidebar__user-data'>
						<div className='profile-sidebar__user-data__avatar'>
							<CustomImage
								width={66}
								height={66}
								className='rounded-lg '
								src='/images/user-unknown.jpg'
								alt=''
							/>
						</div>
						<div className='profile-sidebar__user-data__detail'>
							<div className='profile-sidebar__user-data__detail__name'>
								{`${selector?.userInfo?.firstName} ${selector?.userInfo?.lastName}`}
							</div>
							<div className='profile-sidebar__user-data__detail__email'>
								{selector?.userInfo?.jsonWebToken?.email}
							</div>
						</div>
					</div>
					<div className='profile-sidebar__score'>
						<div className='profile-sidebar__score__title'>{t('Points')}</div>
						<div className='profile-sidebar__score__point'>0</div>
					</div>
					<div className='profile-sidebar__menu-list'>
						<div className='profile-mobile-show-button d-md-none'>
							{showMenu ? (
								<FiX className='font-24' onClick={() => setShowMenu(false)} />
							) : (
								<FiMenu className='font-24' onClick={() => setShowMenu(true)} />
							)}
						</div>
						<ul
							className={`profile-sidebar__menu-list__ul ${
								showMenu ? '' : 'd-none d-md-block'
							} `}
						>
							{menuSidebarLinks.map((item) => (
								<Fragment key={item.id}>
									<LinkSidebarMenu
										activeTab={tab}
										tab={item.tab}
										title={t(`${item.title}`)}
									/>
								</Fragment>
							))}
						</ul>
					</div>
					<div className='profile-sidebar__logout'>
						{' '}
						<div
							className='d-flex justify-content-start align-items-center cursor-pointer'
							onClick={() => runLogOut()}
						>
							<FiLogOut
								className={`${
									selector.darkMode ? 'colorDark' : 'colorLight'
								} font-24 mx-1`}
							/>
							<div className={selector.darkMode ? 'colorDark' : 'colorLight'}>
								{' '}
								{t('LogOut')}
							</div>
						</div>
					</div>
				</div>
			</CardBox>
		</div>
	)
}

export default dynamic(() => Promise.resolve(memo(SideBarMenu)), { ssr: false })
