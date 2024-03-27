import { useEffect, useState } from "react"
import axios from "axios"

export default function StudentTrainingEdit(){

    // Controlling load state
    const [studentDataisLoading, setStudentDataisLoading] = useState(true)

    // Controlling load state
    const [exercisesDataisLoading, setExerciseDataisLoading] = useState(true)

    // Getting current student's ID
    const studentId = document.location.pathname.slice(-1)

    // Getting student information, including its training data
    const [studentData, setStudentData] = useState([])

    // Getting existing exercises information
    const [exerciseList, setExerciseList] = useState([])

    const [selection, setSelection] = useState({})

    function addExerciseToSelection(exerciseId){
        setSelection(prevFormData => {
            return {
                ...prevFormData,
                [exerciseId]: {
                    series:"",
                    load:""
                }
            }
       })
    }

    function removeExerciseFromSelection(exerciseId){


        setSelection(prevFormData => {

            const updatedState = Object.keys(prevFormData).reduce((obj, key) => {
                if (key !== exerciseId) {
                    obj[key] = prevFormData[key];
                }
                return obj;
            }, {});

            return updatedState

       })
    }
    

    useEffect(() => {
       
        axios.get(`http://localhost:8000/students/${studentId}`)
        .then(res => {
            setStudentData(res.data)
            setStudentDataisLoading(false)
        })

        axios.get(`http://localhost:8000/exercises/`)
        .then(res => {
            setExerciseList(res.data)
            setExerciseDataisLoading(false)
        })

    }, [])

    useEffect(() => {
        let practicedExercises = Object.keys(exerciseList)
        console.log(JSON.stringify(practicedExercises))
        if(!studentDataisLoading && !exercisesDataisLoading && practicedExercises.length > 0){
            practicedExercises.map(exerciseId => {
                if(checkIfTheStudentPracticesTheExercise(Number(exerciseId))){
                    setSelection(prevFormData => {
                         return {
                             ...prevFormData,
                             [exerciseId]: {
                                series:"",
                                load:""
                            }
                         }
                    })
                } 
                }
             )
        }
       
    }, [studentData, exerciseList])
     

    function checkIfTheStudentPracticesTheExercise(exercise){
        return studentData.trainingData ? studentData.trainingData.hasOwnProperty(exercise) : ""
    }

    function handleChange(event){
        
        let eventData = event.target.name.split("_")
        let attribute = eventData[0]
        let exerciseId = eventData[1]
        let updatedValue = event.target.value
        

        setSelection(prevFormData => {
            const newState = { ...prevFormData };
            newState[exerciseId] = { ...newState[exerciseId], [attribute]: updatedValue };
            return newState;
       }) 
    }

    function handleSubmit(event){
        event.preventDefault()
        submitForm(selection)
    }

    function submitForm(formData){
        axios.put(`http://localhost:8000/students/${studentId}/training`, formData)
        .then(res => {
            alert("Treino alterado com sucesso")
        })
        .catch((err) => {
            alert("O seguinte erro ocorreu: ", err)
        })
        
    }


    function renderExerciseAndStatus(exerciseId){

        return (

            <div class="m-8 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                
                    <div class="px-5 pb-5">
                        
                        <h5 class="mt-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{exerciseList[exerciseId].exerciseName}</h5>
                    
                        <div class="flex items-center mt-2.5 mb-5">
                            <div class="flex items-center space-x-1 rtl:space-x-reverse">
                                {exerciseList[exerciseId].muscularGroup} 
                            </div>
                            
                        </div>
                        <div>
                            <label for="series" /> Nº de séries
                            <input type="number" name={"series_"+exerciseId} placeholder="Quantidade de séries" onChange={handleChange} class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <label for="repetitions" /> Nº de repetições
                            <input type="number" name={"repetitions_"+exerciseId} placeholder="Quantidade de repetições por série" onChange={handleChange} class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <label for="load" /> Carga (KG)
                            <input type="number" name={"load_"+exerciseId} placeholder="Carga (KG)" onChange={handleChange} class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                              
                            
                            <br/>
                            <button onClick={() => removeExerciseFromSelection(exerciseId)} class="w-full mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Remover</button>
                        </div>
                    </div>
            </div>   
            
        )
      
    }

    return (
        
        <div>
                        <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div class="w-full md:w-1/2">
                                <form class="flex items-center">
                                    <label for="simple-search" class="sr-only">Search</label>
                                    <div class="relative w-full">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
                                    </div>
                                </form>
                            </div>
                            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
    
                                <button type="button" id="createProductModalButton" data-modal-target="createProductModal" data-modal-toggle="createProductModal" class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Adicionar novo aluno
                                </button>
                                
                                <div class="flex items-center space-x-3 w-full md:w-auto">
                                    <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                        <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                        Opções
                                    </button>
                                    <div id="actionsDropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                            <li>
                                                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                            </li>
                                        </ul>
                                        <div class="py-1">
                                            <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                                        </div>
                                    </div>
                                    <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                                        </svg>
                                        Filtro
                                        <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                
                                    <tr>
                                        <th scope="col" class="px-4 py-4"></th>
                                        <th scope="col" class="px-4 py-3">Nome do exercício</th>
                                        <th scope="col" class="px-4 py-3">Descrição do exercício</th>
                                        <th scope="col" class="px-4 py-3">Grupo muscular </th>
                                        <th scope="col" class="px-4 py-3">
                                            <span class="sr-only">Opções</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    Object.keys(exerciseList).map(exerciseId => 
                                            <tr class="border-b dark:border-gray-700">
                                            
                                            
                                            <td class="px-4 py-3">{exerciseList[exerciseId].exerciseName}</td>
                                            
                                            <td class="px-4 py-3">{exerciseList[exerciseId].muscularGroup}</td>

                                            <td class="px-4 py-3">{exerciseList[exerciseId].exerciseDescription}</td>
                                            <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div class="flex items-center space-x-4">
                                                        <button type="button" onClick={() => addExerciseToSelection(exerciseId)} data-modal-target="delete-modal" data-modal-toggle="delete-modal" class="flex items-center bg-green-700 hover:bg-green-800 text-white border border-green-800 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                                            Adicionar ao treino
                                                        </button>
                                                    </div>
                                                </td>
     
                                        </tr>
                                    )
                                    }


                                </tbody>
                            </table>
                        </div>
                        <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span class="font-semibold text-gray-900 dark:text-white">1-10</span>
                                of
                                <span class="font-semibold text-gray-900 dark:text-white">1000</span>
                            </span>
                            <ul class="inline-flex items-stretch -space-x-px">
                                <li>
                                    <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span class="sr-only">Previous</span>
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span class="sr-only">Next</span>
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                
            </section>                    
                
                {(!studentDataisLoading && !exercisesDataisLoading) &&
                    <div className="grid grid-cols-3 w-4/6 mx-auto">
                                            
                        
                        {
                            Object.keys(selection).map(exerciseId => 
                                <div>
                                    {selection[exerciseId] ? renderExerciseAndStatus(exerciseId) : ""}   
                                </div>  
                            )
                        }   
                                
                    </div>
                }
            
                <div className="flex justify-center">
                    <button onClick={handleSubmit} class="w-2/6 mb-4 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"> Salvar alterações </button>
                </div>
                
        </div>
    )
}