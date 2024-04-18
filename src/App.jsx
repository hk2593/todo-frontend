import Home from "./components/Home";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";


export default function App() {
  return (
    <div>
    <Toaster />
    <Router>
        <Routes>  
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}
