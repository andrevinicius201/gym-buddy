import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal } from 'flowbite-react';
import UpdateStudentTrainingDetails from './UpdateStudentTrainingDetails';


export default class ExercisesFilteredSelectBoxClass extends Component {

    
    state = {
        openExerciseRegistrationModal: false,
        currentSelectedExerciseId: null,
        currentSelectedExerciseName: ""
      }


      toggleModal = (exerciseId, exerciseName) => {
       
        this.setState({
            currentSelectedExerciseId: exerciseId,
            currentSelectedExerciseName: exerciseName,
            openExerciseRegistrationModal: !this.state.openExerciseRegistrationModal
        })
        
        // return alert(JSON.stringify(this.state.currentSelectedExerciseId))
        
      }

    
    constructor(props) {

        super(props);

        this.state = {
            selectedExercises: this.props.studentData.studentTraining,
            currentStudentId: this.props.studentData.studentId,
            currentStudentData: this.props.studentData,
            setExerciseDetailsModal: false,
            openExerciseRegistrationModal: false,
        };


        this.handleInputChange = this.handleInputChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }


    handleInputChange(event) {


        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((prevState) => ({
            selectedExercises: {
                ...prevState.selectedExercises,
                [name]: value
            },
        }));

    }


    renderExerciseInfo(item){

        let shouldBeSelected = this.state.selectedExercises[item.exerciseId]  

        return (
            
            <li>
                
                <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    
                <input 
                    id="checkbox-item-11" 
                    checked={shouldBeSelected} 
                    onChange={this.handleInputChange}
                    name={item.exerciseId}
                    type="checkbox" 
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
                />
                <label for="checkbox-item-11" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"> {item.exerciseName} </label>
                <label for="checkbox-item-11" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"> Carga cadastrada:  - </label>
                <label for="checkbox-item-11" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"> Repetições:  - </label>
                
                <a onClick={this.toggleModal.bind(this, item.exerciseId, item.exerciseName)}> Editar detalhes </a>
                </div>
            </li>
        )
    }

    submitForm(formData){ 
        let payload = {
            trainingInfo: formData
        }
        axios.put(`http://localhost:8000/students/${this.props.studentData.studentId}`, payload)
        .then(res => {
          console.log(res)
        })
    }

    handleSubmit(event){
 
        let trainingInfo = this.state.selectedExercises               
        event.preventDefault()
        this.submitForm(trainingInfo)
    }
      
      

    render(){
        return (
            <div>
                
                <div id="dropdownSearch" class="z-10 bg-white rounded-lg shadow dark:bg-gray-700">
                    <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                        
                        {
                            this.props.muscularGroupData.map(item => 
                                this.renderExerciseInfo(item)
                            )
                        }    
                    </ul>  
                    <br/> 

                </div>
                <br/>
                <button type="button" onClick={this.handleSubmit} class="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Finalizar alterações</button>
                
                <Modal show={this.state.openExerciseRegistrationModal} onClose={this.toggleModal}>
                    <Modal.Header> {this.state.currentSelectedExerciseName} </Modal.Header>
                    <Modal.Body>
                        {/* olha - {this.state.currentSelectedExerciseId} */}
                        <UpdateStudentTrainingDetails studentData={this.state.currentStudentData} exerciseId={this.state.currentSelectedExerciseId}/>
                    </Modal.Body>     
                </Modal>
                
                     
            </div>

        )
    }
}