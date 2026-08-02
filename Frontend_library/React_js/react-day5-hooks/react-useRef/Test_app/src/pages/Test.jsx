import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Test_ref from '../components/Test_ref'

const Test = () => {
  return (
   <BrowserRouter>
    <div>
         <Routes>
             <Route path='/test' element={<Test_ref/>}/>
         </Routes>
    </div>
   </BrowserRouter> 
  )
}

export default Test