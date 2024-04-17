import Home from "./components/Home";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



export default function App() {
  return (
    <div>
    <Router>
        <Routes>  
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}
