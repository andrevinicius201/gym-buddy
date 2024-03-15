import axios from 'axios';


export function deleteStudent(email){
    return axios.delete(`http://localhost:8000/students/${email}`)
}