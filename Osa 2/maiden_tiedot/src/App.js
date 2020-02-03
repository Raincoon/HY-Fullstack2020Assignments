import React, {useState, useEffect} from 'react';
import webService from './services/web'

const Input = ({text, value, onChange}) => {
  return(
      <div>
          {text} <input 
          value = {value}
          onChange = {onChange}/>
      </div>
  )
}
const Country = ({c}) => {
  return(
    <div>
      <h1>{c.name}</h1>
      Capital {c.capital}<br/>
      Population {c.population}
      <h2>Languages</h2>
        <ul>
          {c.languages.map(lang => 
            <li key={lang.name}>{lang.name}</li>
          )}
        </ul>
        <img src={c.flag} alt={`Flag of ${c.name}`} height="120" />
    </div>
  )
}

const CoutryList = ({list, fil}) => {
  const countriesToDisplay = list.filter(c => c.name.includes(fil))
  
  if (countriesToDisplay.length > 30) {
    return(<p>Too many matches, please specify further</p>)
  } 
  if (countriesToDisplay.length === 1){
    return(
      <Country c={countriesToDisplay[0]} />
    )
  }
  return(
  countriesToDisplay.map(c => <div key={c.name}>{c.name}</div>)
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  //Import data from https://restcountries.eu/rest/v2/all
  useEffect(() => {
    webService.getCountries()
        .then(res => {
            setCountries(res)
        })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div className="App">
      <Input text="Find countries by name: " value={filter} onChange={handleFilter}/>
      <CoutryList list={countries} fil={filter}/>
    </div>
  );
}

export default App;
