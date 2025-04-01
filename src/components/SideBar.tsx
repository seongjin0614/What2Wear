import './SideBar.css';

import { Link } from 'react-router-dom';

const MenuItems = [
  { path: '/', label: '홈' },
  { path: '/search', label: '검색' },
  { path: '/wtw', label: '왓투웨어' },
  { path: '/mycloset', label: '나의옷장' },
  { path: '/myrecord', label: '나의기록' },
]

export default function SideBar() {
  return (
    <nav className="sideBar">
      <div className="sideBar-header">
        <h1>서비스 이름!! 미정!</h1>
      </div>

      <ul className='Menu'>
        {MenuItems.map(({ path, label }) => (
          <li key={path}>
            <Link to={path}>{label}</Link>
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
