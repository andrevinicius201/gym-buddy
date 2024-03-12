import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import AllExercisesList from "./components/AllExercisesList";
import StudentTrainingInfo from "./components/StudentTrainingInfo";
import UpdateStudentTrainingDetails from "./components/UpdateStudentTrainingDetails";

export default function App() {

  return (
    <Router>
            <Routes>
                <Route exact path="/exercises" element={<AllExercisesList />} />  
                <Route path="/students" element={<StudentTrainingInfo />} />    
                <Route path="/test" element={<UpdateStudentTrainingDetails/>} /> 
            </Routes>
      </Router>  
  )
}
