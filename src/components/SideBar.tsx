import './SideBar.css';

import { Link } from 'react-router-dom';

//fontAwesome 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const MenuItems = [
  { path: '/', label: '홈', icon: faHouse },
  { path: '/search', label: '검색' },
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
      </ul>

      <ul className='userMenu'>
        <li>로그인</li>
        <li>메시지</li>
      </ul>
    </nav>
  )
}
