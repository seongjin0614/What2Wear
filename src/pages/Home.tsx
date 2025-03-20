import './Home.css';
import { useState } from 'react';

export default function Home() {
  // 지역, 날짜 입력 상태 관리
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  // 날씨 데이터 상태 관리
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 지역 입력 핸들러
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  // 날짜 입력 핸들러
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  // 날씨 데이터 가져오기
  const getWeatherData = async (city: string) => {
    const cityWithCountry = `${city},kr`;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityWithCountry}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric&lang=kr`);
    return response.json();
  };


  // 추천 버튼 핸들러
  const handleSubmit = async () => {
    if (!city || !date) {
      alert('지역과 날짜를 모두 입력해주세요');
      return;
    }

    setLoading(true);
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
      console.log('날씨 데이터:', data);
    } catch (error) {
      console.error('날씨 데이터 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
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
        <button
          onClick={handleSubmit}>
          {loading ? '로딩중...' : '추천'}
        </button>
      </div>
    </div>
  )
}
