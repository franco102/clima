import { ChangeEvent, FormEvent, useState } from 'react'
import { countries } from '../../data/countries'
import styles  from './Form.module.css'
import { SearchType } from '../../types'
import { Alert } from '../Alert/Alert'

type FornProps ={
    fetchWeather: (search: SearchType) => Promise<void>
}

export const Form = ({fetchWeather}:FornProps) => {

    const [alert,setAlert]=useState('')
    const [search,setSearch]=useState<SearchType>({
        city:'',
        country:''
    })
    const handlerChange=(e:ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
        setSearch({
            ...search,
            [e.target.name]:e.target.value
        })
    }
    const handlerSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(Object.values(search).includes('')){
            return setAlert('Todos los campos son obligatorios')
        }
        setAlert('')
        fetchWeather(search) 
    }

    return (
        <form className={styles.form} onSubmit={handlerSubmit}>
            {alert && (<Alert>{alert}</Alert>)}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input 
                    type="text" 
                    id='city' 
                    name='city' 
                    placeholder='ciudad' 
                    value={search.city}
                    onChange={handlerChange}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select 
                    name="country" 
                    id="country" 
                    value={search.country}
                    onChange={handlerChange}
                >
                    <option value=""> -- Seleccione el País --</option>
                    {countries.map(country=> (<option key={country.code} value={country.code}>{country.name}</option>) )}
                </select>
            </div>
            <input className={styles.submit} type="submit" value="consultar Clima" />
        </form>
    )
}
