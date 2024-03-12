import React from "react"
import axios from 'axios';
import { useState } from 'react';
import { Button, Toast } from 'flowbite-react';
import { HiCheck } from 'react-icons/hi';

export default function StudentRegistrationForm () {

    const [showToast, setShowToast] = useState(false);
    
    const [formData, setFormData] = React.useState(
        {
            name: "", 
            trainingGoal: "", 
            studentTraining: {},
            isActive: true
        }
    )

    function handleChange(event) {
        const {name, value,} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }


    function submitForm(formData){
        axios.post(`http://localhost:8000/students`, formData)
        .then(res => {
          if((res.status) === 201){
            // document.getElementById("toast-success").setAttribute("style", "display: flex")
            setShowToast((state) => !state)
          } else {
            alert("nao funcionou")
          }
        })
        .catch((err) => {
            alert("Erro ao tentar registrar aluno")
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        submitForm(formData)
    }

    return (      

        <div> 
            

            <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div class="mb-5">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome do aluno </label>
                <input type="text" name="name" value={formData.name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="José Fernandes" onChange={handleChange} required />
            </div>
            
            <label for="trainingGoal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Objetivo de treinamento</label>
                    <select name="trainingGoal" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} value={formData.trainingGoal}>
                        <option selected>Selecione um objetivo</option>
                        <option value="Hipertrofia">Hipertrofia</option>
                        <option value="Emagrecimento">Emagrecimento</option>
                        <option value="Hipertrofia + emagrecimento">Hipertrofia + emagrecimento</option>
                        <option value="Reabilitação">Reabilitação</option>
                    </select>
            
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Completar cadastro</button>
            
            </form>
            
            <div className="space-y-4">
                {showToast && (
                    <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">Aluno adicionado com sucesso!</div>
                    <Toast.Toggle onDismiss={() => setShowToast(false)} />
                    </Toast>
                )}
            </div>




        </div>
    )
}