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
        
        if(!studentDataisLoading && !exercisesDataisLoading){
            Object.keys(exerciseList).map(exerciseId => {
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
        return studentData.trainingData.hasOwnProperty(exercise)
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
                            <label for="series" />
                            <input type="text" name={"series_"+exerciseId} placeholder="Quantidade de séries" onChange={handleChange} class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <label for="load" />
                            <input type="text" name={"load_"+exerciseId} placeholder="Carga (KG)" onChange={handleChange} class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <br/>
                            <button onClick={() => removeExerciseFromSelection(exerciseId)} class="w-full mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Remover</button>
                        </div>
                    </div>
            </div>   
            
        )
      
    }

    return (
   
        <div className="content-center">  
                                
                
                {(!studentDataisLoading && !exercisesDataisLoading) &&
                    <div>
                        <div className="text-center">
                            {
                                Object.keys(exerciseList).map(exerciseId =>   
                                        <div className="m-4 w-full">
                                            <button onClick={() => addExerciseToSelection(exerciseId)} class="w-3/6 text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"> {exerciseList[exerciseId].exerciseName} </button> 
                                        </div>            
                                )
                            }
                    
                        </div>
                        <div className="flex justify-center grid-cols-3">
                        {
                            Object.keys(selection).map(exerciseId => 
                                selection[exerciseId] ? renderExerciseAndStatus(exerciseId) : ""        
                            )
                        }   
                        </div>         
                    </div>
                }
            
                <div className="flex justify-center">
                    <button onClick={handleSubmit} class="w-2/6 mb-4 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"> Salvar alterações </button>
                </div>
                
        </div>
    )
}