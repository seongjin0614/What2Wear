import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <nav className="sideBar">
      <div className="sideBar-header">
        <h1>서비스의 이름이 들어갈 자리!</h1>
      </div>

      <ul className='Menu'>
        <li><Link to='/'>홈</Link></li>
        <li><Link to='/search'>검색</Link></li>
        <li><Link to='/wtw'>왓투웨어</Link></li>
        <li><Link to='/mycloset'>나의옷장</Link></li>
        <li><Link to='/myrecord'>나의기록</Link></li>
      </ul>

      <ul className='userMenu'>
        <li>로그인</li>
        <li>메시지</li>
      </ul>
    </nav>
  )
}
