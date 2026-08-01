import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
// hame route and routes koi import kna hota hai 
// routes component k ander ham route ka use krte hain means routes k ander route ko wrap kr k use krna hai let cook 
const App = () => {
  return (
    <>
    
    {/* navbar here */}

    <Navbar />

      <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/contact' element={<Contact/>} />
      </Routes>
    </>
  )
}

export default App