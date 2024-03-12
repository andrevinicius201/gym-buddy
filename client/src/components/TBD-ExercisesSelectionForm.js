import React from 'react'
import { Badge } from 'flowbite-react';
import { HiCheck, HiClock } from 'react-icons/hi';
import { CiCircleRemove } from "react-icons/ci";


export default class ExercisesSelectionForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            selectedExercises: this.props.studentData.studentTraining,
            currentStudentId: this.props.studentData.studentId
        }
    }

    renderExerciseInfo(item){


        return (
            
            <li>    
                <Badge icon={CiCircleRemove} color="indigo" size="sm">{item.exerciseName}</Badge>
            </li>
        )
    }

    render(){
        return (
            <div>
                <div id="dropdownSearch" class="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                    
                </div>
                <ul class="space-y-4 h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                        
                        {
                            this.props.muscularGroupData.map(item => 
                                this.renderExerciseInfo(item)
                            )
                        }    
                </ul>  
            </div>

        )
    }
    
}

