import './SideBar.css';

import { Link } from 'react-router-dom';

//fontAwesome 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faCompass, faVideo, faPaperPlane, faHeart, faSquarePlus, faUser, faBars } from '@fortawesome/free-solid-svg-icons'

const MenuItems = [
  { path: '/', label: '홈', icon: faHouse },
  { path: '/search', label: '검색', icon: faMagnifyingGlass },
  { path: '/explore', label: '탐색', icon: faCompass },
  { path: '/reels', label: '릴스', icon: faVideo },
  { path: '/messages', label: '메시지', icon: faPaperPlane },
  { path: '/notifications', label: '알림', icon: faHeart },
  { path: '/create', label: '만들기', icon: faSquarePlus },
  { path: '/profile', label: '프로필', icon: faUser },
  { path: '/wtw', label: '왓투웨어' },
  { path: '/mycloset', label: '나의옷장' },
  { path: '/myrecord', label: '나의기록' },
  { path: '/guestbook', label: "방명록" }
]



export default function SideBar() {
  return (
    <nav className="sideBar">
      <div className="sideBar-header">
        <h1>Outstagram</h1>
      </div>

      <ul className='Menu'>
        {MenuItems.map(({ path, label, icon }) => (
          <li key={path}>
            <Link to={path}>{icon && <FontAwesomeIcon icon={icon} />} {label}</Link>
          </li>
        ))}
        <li><Link to="/setting"><FontAwesomeIcon icon={faBars} /></Link> 더 보기</li>
      </ul>
    </nav>
  )
}
