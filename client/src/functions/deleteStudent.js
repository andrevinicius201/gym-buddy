import axios from 'axios';


export function deleteStudent(studentId){
    return axios.delete(`http://localhost:8000/students/${studentId}`)
}