export default function Home(){
    return (
        

<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
            
            <h1 class="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">Bem-vindo ao Gym Buddy, o seu parceiro de treinos </h1>
            
        </div>
        <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
               
                <h2 class="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Acesso à página de exercícios</h2>
                <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Consulte os exercícios cadastrados e faça alterações nos já existentes</p>
                <a href="/exercises" class="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"> Página de exercícios
                    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                </a>
            </div>
            <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
               
                <h2 class="text-gray-900 dark:text-white text-3xl font-extrabold mb-2"> Acesso à página de alunos</h2>
                <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Gerencie os alunos cadastrados e seus treinos</p>
                <a href="/students" class="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"> Página de alunos
                    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                </a>
            </div>
        </div>
    </div>
</section>

    )
}