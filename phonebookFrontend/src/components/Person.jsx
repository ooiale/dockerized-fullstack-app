
const Person = ( {person, deletePerson} ) => {
    return (
        <li key={person.id}>
            {person.name} {person.phone} {' '}
            
            <button onClick={deletePerson}> delete </button>     
        </li>
    )
}

export default Person