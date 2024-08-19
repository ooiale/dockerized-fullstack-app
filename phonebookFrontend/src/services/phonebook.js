import axios from 'axios'

//const baseUrl = 'http://localhost:3000/api/persons'
const baseUrl = 'http://localhost:8080/api/api/persons'
//const baseUrl = '/api/persons'

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    request.then ( () => {
        console.log('deleted with success')
    })
    .catch( error => console.log(`failed to delete ${error}`))
}

const getAll = () => {
    const request = axios.get(`${baseUrl}`)
    return request.then(response => response.data)
}

const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then( response => response.data)
}

export default {create, deletePerson, getAll, update}