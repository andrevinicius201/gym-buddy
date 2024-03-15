import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';    


import React from "react";
import axios from "axios";

export default function UpdateStudentTrainingDetails({studentData, exerciseId}){

    

    const email = studentData.email
    const studentTraining = studentData.trainingData[exerciseId]
    let studentTrainingDetails = {}

    if(studentTraining){
        studentTrainingDetails = {
            currentlyPracticed: studentTraining.currentlyPracticed ? true : false,
            load: studentTraining.load ? studentTraining.load : 0,
            series: studentTraining.series ? studentTraining.series : 0,
            repetitions: studentTraining.repetitions ? studentTraining.repetitions : 0,
            observations: studentTraining.observations ? studentTraining.observations : "",
        }
    } else {
        studentTrainingDetails = {
            currentlyPracticed: false,
            load: 0,
            series: 0,
            repetitions: 0,
            observations: "",
        }
    }


    const [formData, setFormData] = React.useState(
        {"currentlyPracticed":studentTrainingDetails.currentlyPracticed, "load":studentTrainingDetails.load, "series":studentTrainingDetails.series, "repetitions":studentTrainingDetails.repetitions, "observations":studentTrainingDetails.observations}
    )



    function handleChange(event){
        setFormData(currentFormData => {
            return {
                ...currentFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        const payload = {
            "currentlyPracticed":true, "load":formData.load, "series":formData.series, "repetitions":formData.repetitions, "observations":formData.observations
        }
        submitForm(email, exerciseId, payload)
    }

    function submitForm(email, exerciseId, updatedExercise){
    
        axios.put(`http://localhost:8000/students/${email}/${exerciseId}`, updatedExercise)
        .then(res => {
            if((res.status) === 201){
                alert("Exercicio alterado com sucesso")
              } else {
                console.log("Nao enviado")
              }
        })
        .catch((err) => {
            alert("Erro ao adicionar novo exercicio")
        })
        
    }

    return (
        <div class="relative p-4 w-full max-w-md max-h-full">
            <form onSubmit={handleSubmit}>
                <label for="load" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Carga (KG) </label>
                <input
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-6/12 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    type="text"
                    placeholder="Carga (KG)"
                    onChange={handleChange}
                    name="load"
                    value={formData.load}
                />
                
                <label for="series" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Quantidade de séries </label>
                <input
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-6/12 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    type="text"
                    placeholder="Quantidade de séries"
                    onChange={handleChange}
                    name="series"
                    value={formData.series}
                />

                <label for="repetitions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Quantidade de repetições por série </label>
                <input
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-6/12 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    type="text"
                    placeholder="Quantidade de repetições por série"
                    onChange={handleChange}
                    name="repetitions"
                    value={formData.repetitions}
                />

                <label for="observations" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Observações adicionais </label>
                <input
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-6/12 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    type="text"
                    placeholder="Observações"
                    onChange={handleChange}
                    name="observations"
                    value={formData.observations}
                />
                <br/>
        
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirmar alterações</button>
            </form> 
        </div>
        
    )

}