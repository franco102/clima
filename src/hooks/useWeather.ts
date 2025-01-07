import axios from 'axios'
import { SearchType } from '../types'
import { InferOutput, number, object, parse, string } from 'valibot';
import { useMemo, useState } from 'react';
// import { z as zod } from 'zod'
// TYPE GUARD O ASSERTION
// function isWeatherReponse(weather:unknown): weather is WeatherType {
//     return (
//         Boolean(weather) &&
//         typeof weather==='object'&&
//         typeof (weather as WeatherType).name==='string' &&
//         typeof (weather as WeatherType).main.temp==='number' &&
//         typeof (weather as WeatherType).main.temp_max==='number' &&
//         typeof (weather as WeatherType).main.temp_min==='number' 
//     )

// }
// //ZOD
// const weatherZod=zod.object({
//     name:zod.string(),
//     main:zod.object({
//         temp:zod.number(),
//         temp_max:zod.number(),
//         temp_min:zod.number(),

//     })
// })
// type weatherZod=zod.infer<typeof weatherZod>

//VALIBOT
const initialWeather={
    main:{
        temp:0,
        temp_max:0,
        temp_min:0
    },
    name:''
}

const WeatherSchema=object({
    name:string(),
    main:object({
        temp:number(),
        temp_max:number(),
        temp_min:number(),

    })
})

export type WeatherSchema = InferOutput<typeof WeatherSchema>

export default function useWeather (){
    const API_KEY_WEATHER=import.meta.env.VITE_API_KEY; 

    const [weather,serWeather]=useState<WeatherSchema>(initialWeather)
    const [loading,setLoading]=useState(false);
    const [notFound,setNotFound]=useState(false);
    const fetchWeather= async(search:SearchType)=>{
        try {
            serWeather(initialWeather)
            setLoading(true)
            setNotFound(false)
            const {data}= await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${API_KEY_WEATHER}`)
            if(!data[0]){
                setNotFound(true)
                return 
            }
            
            const lat=data[0].lat
            const lon=data[0].lon
            const {data:weatherResponse}=await  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}`)
            // console.log(isWeatherReponse(weatherResponse))
            // const result =weatherZod.safeParse(weatherResponse)
            //Valibot
            serWeather( parse(WeatherSchema,weatherResponse) );

        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }
    const hasWetherData=useMemo(()=> weather.name.length>0 ,[weather])

    return {
        fetchWeather,
        weather,
        hasWetherData,
        loading,
        notFound
    }
}