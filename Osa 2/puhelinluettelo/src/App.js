import React, {useState, useEffect} from 'react'
import personService from './services/persons'
import Button from './components/Button'

const Input = ({text, value, onChange}) => {
    return(
        <div>
            {text} <input 
            value = {value}
            onChange = {onChange}/>
        </div>
    )
}
const People = ({list, fil, del}) => {
    return(
        list
        .filter(p => p.name.includes(fil))
        .map((p)=> <Person key={p.name} person={p} del={del}/>))
}
const Person = ({person, del}) => {
    return(
    <p>
        {person.name}<br/>
        {person.number}
        <Button onClick={()=>del(person)} text="delet" />
    </p>)
}
const Notification = ({ message, isError}) => {
    if (message === null) {
      return null
    }
    if (isError) {
        return(
        <div className="error">
            {message}
        </div>)
    }
    return (
      <div className="success">
        {message}
      </div>
    )
  }

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [err, setErr] = useState(null)
  const [success, setSuccess] = useState(null)

  //Import initial JSON data
  useEffect(() => {
    personService
        .getAll()
        .then(res => {
            setPersons(res)
        })
  }, [])
  //Adding new data
  const handleForm = (event) => {
    event.preventDefault()
    const newPerson = {
        name:newName,
        number:newNumber
    }
    const newList = persons.filter((p) => p.name === newName)
    if (newList.length === 0) { //If new name is not added
        //Add new
        personService
        .create(newPerson)
        .then(returnedPerson => {
            successMsg(`${returnedPerson.name} was added!`)
            setPersons(persons.concat(returnedPerson))
        })
    } else {
        //Update info?
        const updateP = newList[0] //newList should only have 1 entry due to no duplicate entries 
        const response = window.confirm(`Do you want to update the number for ${updateP.name}?`)
        if (response) { 
            //Update is go!
            personService
            .update(updateP.id, newPerson)
            .then(returnedPerson => {
                successMsg(`Number for ${updateP.name} updated!`)
                setPersons(persons
                        .map(p => 
                            p.id !== returnedPerson.id ?
                            p : returnedPerson
                        ))
            })
            .catch(err =>{
                errorMsg(`${updateP.name} has already been removed by someone, could not make changes`)
                setPersons(persons.filter(n => n.id !== updateP.id))
            })
        } else {
            errorMsg(`Number for ${updateP.name} was not updated`)
        }
    }
    setNewName('')
    setNewNumber('')
  }
  //Deleting data
  const askAndDelete = p => {
    const response = window.confirm(`Are you sure you want to delete ${p.name}?`)
    if (response) {
        personService
        .remove(p.id)
        .then(() => {
            errorMsg(`${p.name} was deleted`)
            setPersons(persons.filter(n => n.id !== p.id))
        })
    }
  }
  //Notification 
  const errorMsg = msg => {
    setErr(msg)
      setTimeout(() => {
        setErr(null)
      }, 5000)
  }
  const successMsg = msg => {
    setSuccess(msg)
      setTimeout(() => {
        setSuccess(null)
      }, 5000)
  }

  //handlers
  const handleNameField = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberField = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={err} isError={true}/>
      <Notification message={success} isError={false}/>
        <Input text="Filter" value={filter} onChange={handleFilter}/>
      <h2>Add new person</h2>
    <div>
        <form onSubmit = {handleForm}>
            <Input text="Nimi:" value={newName} onChange={handleNameField} />
            <Input text="Number:" value={newNumber} onChange={handleNumberField} />
            <button type="submit">add</button>
        </form>
    </div>
      <h2>Numbers</h2>
      <People list={persons} fil={filter} del={askAndDelete} />
    </div>
  )
}

export default App