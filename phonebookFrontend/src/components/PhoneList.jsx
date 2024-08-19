import Person from './Person'

const PhoneList = ({listToShow, deletePerson}) => {
  //console.log('banana', listToShow)
  if (!listToShow) {
    return <></>
  }
    return (
        <ul>
        {listToShow.map ( (p) => {
          return (
           <Person 
              key = {p.id} 
              person = {p} 
              deletePerson = {() => deletePerson(p.id)} />
          )
        })}
      </ul>
    )
}

export default PhoneList