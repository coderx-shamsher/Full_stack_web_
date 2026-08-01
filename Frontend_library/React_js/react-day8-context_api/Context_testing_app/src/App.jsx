import React from 'react'
import Navbar from './components/Navbar'
import Change from './components/Change'
const App = () => {
  return (
    <div> 
        <Navbar /> 
        <section style={{
         display: "flex",
         justifyContent : "start"
       }}>
            <Change/>
       </section> 
    </div>
  )
}

export default App