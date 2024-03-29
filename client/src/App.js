import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import AllExercisesList from "./pages/ExercisesList";
import StudentsList from "./pages/StudentsList";
import Home from './pages/Home';
import Menu from './components/Menu';
import RegisterPage from './pages/GymActivation';
import LoginPage from './pages/Login';
import StudentTrainingEdit from './pages/StudentTrainingEdit';
import { jwtDecode } from 'jwt-decode' 

import { AuthContextProvider } from './Context/AuthContext'


// function RequiresInstructorOrAboveRoute({ children, isPrivate }) {
 
//   const { loading, authenticated, role } = useContext(Context);

//   let userRole

//   try {
//     userRole = localStorage.getItem('loggedUserRole')
//   } catch(err){
//     userRole = undefined
//   }


//   if (loading) {
//     return <p> Por favor, aguarde.. página em carregamento </p>;
//   }

//   if (isPrivate && (!authenticated || userRole == 'student')) {
//     return <Navigate to="/login" />
//   } else {

//     return <>{children}</>
//   }

// }


// function RequiresABACValidationForStudents({ children, isPrivate }) {

//   const { loading, authenticated, role } = useContext(Context);

//   const { pathname } = window.location;
//   const paths = pathname.split("/").filter(entry => entry !== "");
//   const pathId = paths[paths.length - 1];

//   let userRole, userId

//   try {
//     userRole = localStorage.getItem('loggedUserRole')
//     userId = jwtDecode(localStorage.getItem('token')).userId
//   } catch(err){
//     userRole = undefined
//   }
  
//   if (loading) {
//     return <p> Por favor, aguarde.. página em carregamento </p>;
//   }

//   if (isPrivate && (!authenticated || (userRole == 'student' && userId != pathId))) {
//     return <Navigate to="/login" />
//   } else {
//     return <>{children}</>
//   }
// }


export default function App() {
  const userRole = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')).role : undefined
  localStorage.setItem('loggedUserRole', userRole)

  return (
    <AuthContextProvider>
          <Menu/>
          <Router>
            <Routes>
                
                <Route 
                  exact 
                  path="/" 
                  element={
                    // <RequiresInstructorOrAboveRoute isPrivate={true}>
                      <Home/>
                    // </RequiresInstructorOrAboveRoute>
                  }
                /> 

                <Route
                  path="/exercises"
                  element={
                    // <RequiresInstructorOrAboveRoute isPrivate={true}>
                      <AllExercisesList/>
                    // </RequiresInstructorOrAboveRoute>
                  }
                />

                <Route
                  path="/students"
                  element={
                    // <RequiresInstructorOrAboveRoute isPrivate={true}>
                      <StudentsList/>
                    // </RequiresInstructorOrAboveRoute>
                  }
                />

                <Route
                  path="/students/:id"
                  element={
                    // <RequiresABACValidationForStudents isPrivate={true}>
                      <StudentTrainingEdit />
                    // </RequiresABACValidationForStudents>
                  }
                />

                {/* <Route
                  path="/administration/registration-code-creation"
                  element={
                    <RequiresInstructorOrAboveRoute isPrivate={true}>
                      <ActivationCodeCreationForm />
                    </RequiresInstructorOrAboveRoute>
                  }
                /> */}

                <Route exact path="/register" element={<RegisterPage />} />
                <Route exact path="/login" element={<LoginPage />} /> 
                
              
          </Routes> 
        </Router> 
    </AuthContextProvider>
  )
}



