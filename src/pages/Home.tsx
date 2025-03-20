import './Home.css';
import { useState } from 'react';

export default function Home() {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };


  return (
    <div>
      <div className='homeTitle'>
        <h1>What2Wear</h1>
        <h3>지역, 날짜를 입력하면 날씨 정보를 바탕으로 옷을 추천해주는 서비스</h3>
      </div>

      <div className='infoInput'>
        <input
          type="text"
          placeholder="지역"
          value={city}
          onChange={handleCityChange}
        />
        <input
          type="date"
          placeholder="날짜"
          value={date}
          onChange={handleDateChange}
        />
        <button>추천</button>
      </div>
    </div>
  )
}
