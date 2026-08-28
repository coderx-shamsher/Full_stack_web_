import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import About from '../pages/About'
import Signup from '../pages/Signup'
import Users from '../pages/Users'

function App() {
  const [count, setCount] = useState(0)

  return (
     <>
      <Routes>
         <Route path='/about'  element={<About/>}/>
         <Route path='/signup'  element={<Signup/>}/>
         <Route path='/users'  element={<Users/>}/>
      </Routes>

     </>
  )
}

export default App
