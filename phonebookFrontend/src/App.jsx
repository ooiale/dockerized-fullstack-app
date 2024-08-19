import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PhoneList from './components/PhoneList'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Warning from './components/Warning'

import personServices from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState('')
  const [warning, setWarning] = useState('')

  const addNotification = (name, type) => {
    switch (type) {
      case 'add':
        setNotification(`Added ${name}`)
        break
      case 'missing':
        setWarning(`information of ${name} has already been removed from the server`)
        break
      case 'update':
        setNotification(`Updated ${name}`)
        break
      case 'delete':
        setNotification(`deleted ${name}`)
        break
      case 'error':
        setWarning(`${name}`)
        break
    }
  }
  if (notification) {
    setTimeout(() => {
      setNotification(null);
    }, 5000);      
  }

  if (warning) {
    setTimeout(() => {
      setWarning(null);
    }, 5000);
  }


  useEffect( () => {
    console.log('effect')
    personServices.getAll()
    .then( (initialData) => {
      console.log(initialData)
      console.log('promise fullfilled')
      setPersons(initialData)
    })
    .catch( () => console.log('failed initializing the data'))
  }, [])

  const filterNames = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const isAdded = () => {
    const found = persons.find( (p) => {
      return (
        p.name === newName
      )
    })

    return found
  }

  const addNumber = (event) => {
    event.preventDefault()

    if(!isAdded()) {
        const newPerson = {
          name: newName,
          phone: newPhone
        }
        personServices
          .create(newPerson)
          .then( (returnedPerson) => {
            console.log(returnedPerson)
            setPersons(persons.concat(returnedPerson))
            addNotification(returnedPerson.name, 'add')
          })
          .catch( error => {
            if (error.response && error.response.status === 400) {
              console.log('Validation error')
              addNotification(error.response.data.error, 'error')
            } else {
              console.error('Error creating person:', error);
              }
          })
    } else {
        const confirmation =  (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) 
        

        if (confirmation){
          const personToUpdate = persons.find(person => person.name === newName)
          const updatedPerson = {...personToUpdate, phone: newPhone}
          personServices
          .update(updatedPerson.id, updatedPerson)
            .then( (returnedPerson) => {
              addNotification(returnedPerson.name, 'update')
              setPersons ( persons.map (
                person => {
                  return person.id !== returnedPerson.id ? person : returnedPerson;
                }
              ))
            }) .catch( error => {
                  if (error.response && error.response.status === 400) {
                    console.log("Validation Errror")
                    addNotification(error.response.data.error, 'error')
                  } else {
                    addNotification(updatedPerson.name, 'missing')
                  }
                })
        }
    }
    setNewName('')
    setNewPhone('')
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const confirmation = window.confirm(`Delete ${person.name}?`)
    if (confirmation) {
      personServices.deletePerson(id)
      addNotification(person.name, 'delete')
      const newList = persons.filter(person => person.id !== id)
      setPersons(newList)
    }
  }



  const listToShow = newFilter
    ?persons.filter ( (p) => {
      return (
        p.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    })
    :persons
      

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Warning message={warning}/>
      <Filter newFilter = {newFilter}
              filterNames = {filterNames} />
      <PersonForm 
        addNumber = {addNumber}
        newName  = {newName}
        handleNameChange = {handleNameChange}
        newPhone = {newPhone}
        handlePhoneChange = {handlePhoneChange}
        />
      <h3>Numbers</h3>
      <PhoneList 
        listToShow={listToShow}
        deletePerson={deletePerson}
        />
    </div>
  )
}

export default App