import React from "react"
import axios from 'axios';

export default function RegisterPage(){

    const [formData, setFormData] = React.useState({})

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
        axios.post(`http://localhost:8000/auth/register`, formData)
        .then(res => {
          if((res.status) === 201){
            alert("Usuario registrado com sucesso")
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
    <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Cadastro de instrutor
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome de usuário</label>
                      <input type="text" name="username" id="username" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="josefernandes197" required="" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                 
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Criar conta</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Já possui uma conta? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Fazer login</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    )
}