import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';

const apiKey = ' e52bda4c44644470916151659242603';
const apiUrl = 'https://api.weatherapi.com/v1/current.json';


function SearchBox({onsearch}){
  const [city, setCity] = useState('');
  
  const handleSearch = ()=>{
    if(city)
     onsearch(city);
  }
  return(
    <div>
      <input type='text' className='inputQuery' placeholder='Enter City name' value={city} onChange={(e)=>{setCity(e.target.value)}}/>
      <button onClick={handleSearch}>Search</button>
    </div>
  )

}

function WeatherCard({title, data}){
  return(
    <div className='weather-card'>
      <h2>{title}</h2>
      <p>{data}</p>
    </div>
  )
}

function WeatherDisplay({city}){
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    if(city){
      setLoading(true);
      axios
      .get(apiUrl, {
          params:{
            key:apiKey,
            q: city
        }})
      .then((res)=>setWeatherData(res.data))
      .catch((err)=>{
          alert('Failed to fetch weather data');
        })
      .finally(()=>{
          setLoading(false);
          console.log(weatherData);
        });
    }
  },[city]);

  return (
    <div className='weather-display'>
      {loading && <p>Loading data...</p>}
      {/* Prevoiusly, u got error saying cannot read current of undefined. coz initially data is null, so added && weatherData, to ensure that the data exists */}
      {!loading && weatherData &&
      <div className='weather-cards'>
          <WeatherCard title='Temperature' data={`${weatherData.current.temp_c}°C`}/>
          <WeatherCard title='Humidity' data={`${weatherData.current.humidity}%`}/>
          <WeatherCard title='Condition' data={weatherData.current.condition.text}/>
          <WeatherCard title='Wind' data={`${weatherData.current.wind_kph}kph`}/>
        </div>}
    </div>
  )

}

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  const handleSearch = (city)=>{
   setQuery(city);
  }

  return (
    <div className="App">
    <SearchBox onsearch={handleSearch} />
    <WeatherDisplay city={query}/>
    </div>
  );
}

export default App;
