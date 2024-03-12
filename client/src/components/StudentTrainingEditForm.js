import ExercisesFilteredSelectBoxClass from './ExercisesFilteredSelectBoxClass';
import React from 'react'


export default function studentDataEditForm({studentData, exerciseList}) {


    //Filtrando apenas os exercicio pertencentes ao grupo muscular passado como parâmetro
    function getSuperiorMuscularGroup(exercise){
      return  exercise.muscularGroup == "Superiores"
    }
    function getInferiorMuscularGroup(exercise){
      return  exercise.muscularGroup == "Inferiores"
    }
    function getAbsMuscularGroup(exercise){
      return  exercise.muscularGroup == "Abdomen"
    }

  return (
    
    <div>
      <div class="p-3">
          <label for="input-group-search" class="sr-only">Search</label>
          <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              </div>
              <input type="text" id="input-group-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" />
          </div>
      </div>
      <ExercisesFilteredSelectBoxClass muscularGroupData={exerciseList} studentData={studentData}/>
      
    </div>

  );
}