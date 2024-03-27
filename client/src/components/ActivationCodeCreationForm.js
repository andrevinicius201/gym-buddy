import React from "react"
import axios from 'axios';
import { useState } from 'react';
import { Button, Toast } from 'flowbite-react';
import { HiCheck } from 'react-icons/hi';

export default function ActivationCodeCreationForm () {

    const [showToast, setShowToast] = useState(false);
    
    const [activationCode, setActivationCode] = useState("");

    function handleChange(event) {
        setActivationCode(event.target.value)
    }


    function submitForm(activationCode){
        axios.post(`http://localhost:8000/access-code/`, activationCode)
        .then(res => {
          if((res.status) === 201){
            alert(JSON.stringify(res))
            setShowToast((state) => !state)
          } else {
            alert("Erro ao registrar activation code")
          }
        })
        .catch((err) => {
            alert("Erro ao registrar activation code")
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        let payload = {
            temporaryCode: activationCode
        }
        submitForm(payload)
    }

    return (      

        <div className="h-screen bg-gray-400 flex items-center justify-center"> 
       
            <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div class="mb-5">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> [Área restrita] - Insira o código de ativação </label>
                    <input type="text" name="name" value={activationCode} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="GH4DNL" onChange={handleChange} required />
                </div>
                
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submeter código de ativação</button>
            </form>
            
            <div className="space-y-4">
                {showToast && (
                    <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal"> Código de ativação criado com sucesso! </div>
                    <Toast.Toggle onDismiss={() => setShowToast(false)} />
                    </Toast>
                )}
            </div>

        </div>
    )
}