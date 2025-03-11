import { useState, useEffect } from 'react';
import './App.css';
import clearIcon from "./assets/Clear.png";
import cloudyIcon from "./assets/Cloudy.png";
import drizzleIcon from "./assets/Drizzle.png";
import rainIcon from "./assets/Rain.png";
import windIcon from "./assets/Wind.png";
import snowIcon from "./assets/Snow.png";
import HumidityIcon from "./assets/Humidity.png";

const WeatherDetails=({icon,temp,city,country,lat,log,wind,humidity})=>{
  return(
    <>
    <div className='image'>
      <img src={icon} alt="image" />
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='city'>{city}</div>
    <div className='country'>{country}</div>
    <div className='cord'>
    <div>
      <span className='lat'>latitude</span>
      <span>{lat}</span>
      </div>
      <div>
      <span className='log'>longitude</span>
      <span>{log}</span>
      </div>
    </div>
      <div className='dataContainer'>
        <div className='element'>
          <img src={HumidityIcon} className='icon' />
          <div className='humidityprecent'>{humidity}%</div>
          <div className='text'>Humidity</div>
        </div>
      
      <div className='element'>
          <img src={windIcon} className='icon' />
          <div className='windspeed'>{wind}</div>
          <div className='text'>Wind Speed</div>
        </div>
      </div>
      
      
    

    </>
  )
}
export const App = () => {
  const[icon, setIcon]=useState(clearIcon)
  const[temp, setTemp]=useState(0)
  const[city, setCity]=useState("Chennai")
  const[country, setCountry]=useState("India")
  const[lat, setLat]=useState(0)
  const[log, setLog]=useState(0)
  const[wind, setWind]=useState(0)
  const[humidity, setHumidity]=useState(0)
  const [text, setText]=useState("Chennai")
  const [citynotfound, setcityNotFound]=useState("false")
  const [loading, setLoading]=useState("false")
   const weatherIconMap ={
    "01d" : clearIcon,
    "01n" : clearIcon,
    "02d" : cloudyIcon,
    "02n" : cloudyIcon,
    "03d" : drizzleIcon,
    "03n" : drizzleIcon,
    "04d" : drizzleIcon,
    "04n" : drizzleIcon,
    "09d" : rainIcon,
    "09n" : rainIcon,
    "010d" : rainIcon,
    "010n" : rainIcon,
    "50d" : snowIcon,
    "50n" : snowIcon
  }
  

  const search = async ()=>{
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=f131f885e931e3d293970ad123c74566&units=Metric`

    try{
      let res = await fetch(url)
      let data= await res. json()
      if (data.cod==="404"){
        alert("City Not Found")
        setcityNotFound(true)
        setLoading(false)
      return
      }
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setTemp(Math.floor(data.main.temp))
      setCity(data.name)
      setCountry(data.sys.country)
      setLat(data.coord.lat)
      setLog(data.coord.lon)
      const weatherIconCode = data.weather[0].icon
      setIcon(weatherIconMap[weatherIconCode] || clearIcon)
      setcityNotFound(false)
    }
    catch (error){
      console.error("An error occured:", error.message)
    }
    finally{
      
    }
  }

  
  

  const handleCity=(e) => {
    setText(e.target.value)
  }
  const handleEnter=(e) =>{
    if(e.key=== 'Enter')
      search()
  }
  useEffect(function(){
    search()
  }, [])
  return (
    <>
    <div className='container'>
      <div className='input-container'>
        <input type="text" placeholder='Enter City' 
        className='cityInput' onChange={handleCity} value={text}
        onKeyDown={handleEnter}/>
        <div className='searchIcon' onClick={() => search()}>
        <button>Search</button>
        </div>
        
      </div>
      <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} wind={wind} humidity={humidity}/>
    </div>
    </>
  )
}
