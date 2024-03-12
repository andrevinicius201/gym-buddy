import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import AllExercisesList from "./components/AllExercisesList";
import StudentTrainingInfo from "./components/StudentTrainingInfo";

export default function App() {

  return (
    <Router>
            <Routes>
                <Route exact path="/" element={<StudentTrainingInfo />} /> 
                <Route exact path="/exercises" element={<AllExercisesList />} />  
                <Route path="/students" element={<StudentTrainingInfo />} />    
            </Routes>
      </Router>  
  )
}
