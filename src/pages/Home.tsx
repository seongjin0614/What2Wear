import './Home.css';
import { useState } from 'react';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: [{
    description: string;
  }];
}

interface GptResponse {
  choices: [{
    message: {
      content: string;
    }
  }]
}

export default function Home() {
  // 지역, 날짜 입력 상태 관리
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  // 날씨 상태 관리
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  // gpt 추천 데이터 상태 관리
  const [recommendation, setRecommendation] = useState<string | null>(null);

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

  // gpt 추천 데이터 가져오기
  const getClothingRecommendation = async (weatherInfo: WeatherData) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: `현재 날씨 정보입니다:
              - 기온: ${weatherInfo.main.temp}°C
              - 체감온도: ${weatherInfo.main.feels_like}°C
              - 습도: ${weatherInfo.main.humidity}%
              - 날씨: ${weatherInfo.weather[0].description}
              
              이 날씨에 적합한 옷차림을 추천해주세요. 
              답변은 다음 형식으로 해주세요:
              1. 추천 옷차림:
              2. 추천 이유:
              3. 주의사항:`
          }],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GPT API 오류: ${JSON.stringify(errorData)}`);
      }

      const data: GptResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('GPT API 호출 실패:', error);
      throw error;
    }
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
      const recommendation = await getClothingRecommendation(data);
      setRecommendation(recommendation);
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

      {/* 날씨 정보 표시 섹션 추가 */}
      {weatherData && (
        <div className='weatherInfo'>
          <h2>{city}의 날씨 정보</h2>
          <div className='weatherDetails'>
            <p>현재 기온: {weatherData.main.temp}°C</p>
            <p>체감 온도: {weatherData.main.feels_like}°C</p>
            <p>습도: {weatherData.main.humidity}%</p>
            <p>날씨: {weatherData.weather[0].description}</p>
          </div>
        </div>
      )}
      {recommendation && (
        <div className='recommendation'>
          <h2>추천 옷차림</h2>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  )
}
