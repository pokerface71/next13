import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
type TLinkSideBarMenu = {
	title: string
	tab?: string
	activeTab?: string | string[]
}
const LinkSidebarMenu: FC<TLinkSideBarMenu> = ({ title, tab, activeTab }) => {
	const router = useRouter()
	return (
		<li className='profile-sidebar__menu-list__ul__li'>
			<Link
				href={`${
					router.locale === 'en'
						? `/en/profile/?profileTab=${tab}`
						: `/profile/?profileTab=${tab}`
				}`}
				className={`${activeTab === tab ? 'active' : ''}`}
			>
			{title}
			</Link>
		</li>
	)
}

export default LinkSidebarMenu
