import React from 'react'
import Test from './components/Test'
import Api_call from './components/Api-call'

const App = () => {
  return (
    <div>
       
       <section style={{display:"flex", justifyContent :"center" , gap :"20px", padding :"40px"}}>
            {/* <Test/> */}

            <h2>api calling </h2>
            <Api_call/>
       </section>
    </div>
  )
}

export default App