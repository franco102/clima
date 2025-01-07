import styles from  './App.module.css'
import { Alert } from './components/Alert/Alert.tsx';
import { Form } from './components/Form/Form.tsx'
import { Spinner } from './components/Spinner/Spinner.tsx';
import { WeatherDetail } from './components/WeatherDetail/WeatherDetail.tsx';
import useWeather from './hooks/useWeather.ts'

function App() { 
  const { fetchWeather,weather,hasWetherData,loading ,notFound}=useWeather();
  return (
    <> 
      <h1 className={styles.title} >Buscador de clima</h1>
      <div className={styles.container}>
        <div> 
          <Form fetchWeather={fetchWeather}/>
        </div>
        { loading && <Spinner/>}
        { hasWetherData && <WeatherDetail weather={weather}/> }
        { notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  )
}

export default App
