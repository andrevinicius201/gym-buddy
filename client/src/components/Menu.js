import React, { useContext } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from "../hooks/useLogout"


export default function Menu() {

  const {user} = useAuthContext()
  const {logout} = useLogout()

  const handleLogout = () => {
    logout()
  }

  return (
    
    <nav class="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      {/* {JSON.stringify(user)} */}
      
      <div class="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4">
            
            <span> Gym Buddy </span>
            
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            
              <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                { 
                  user && user.user_role == "gym-admin" ? <li> <a href="/instructors" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Instrutores</a> </li> : ""
                }
                
                { 
                  user && user.user_role != "student" ? <li> <a href="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Início</a> </li> : ""
                }

                {
                 user && user.user_role != "student" ? <li> <a href="/exercises" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Exercícios</a> </li> : ""
                }

                {
                  user && user.user_role != "student" ? <li> <a href="/students" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Alunos</a> </li> : ""
                }   

                {
                  user && user.user_role == "student" ? <li> <a href={`/students/${user.userId}`} class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Meus treinos</a> </li> : ""
                } 

                {
                  user ? <li> Conectado! <a href="/login" onClick={handleLogout} class="px-3 ml-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"> Desconectar </a> </li> : <li> Não conectado </li>
                } 



              </ul>
            </div>
      </div>
      
    </nav>

  );
}
