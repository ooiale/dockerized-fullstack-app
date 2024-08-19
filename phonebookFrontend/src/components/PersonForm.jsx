const PersonForm = ({addNumber, newName, handleNameChange, newPhone, handlePhoneChange}) => {
    return (
        <form onSubmit={addNumber}>
        <h2>add a new</h2>
        <div>
          name: <input 
              value={newName}  
              onChange={handleNameChange}
                />
        </div>
        <div>
          number: <input
                value = {newPhone}
                onChange = {handlePhoneChange}
                    />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm