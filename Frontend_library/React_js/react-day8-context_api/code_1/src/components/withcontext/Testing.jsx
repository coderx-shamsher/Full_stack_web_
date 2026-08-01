import React, { useContext } from 'react'
import Context, { GlobalData } from '../../context/Context'

const Testing = () => {

  // 1) main useContext hook ka use krna use import krlo ..

  // 2) import your Context api what you create maine jo data create kr hai GlobalData name ka use maine import kra hai , fir ussee globaldata mein store kra hai  

   let globaldata =   useContext(GlobalData)
  
   // ese meine eek variable mein store krvaya hai let use 
   console.log(globaldata);
  
   return (
    <div>        
        <ul>
            <h3>Context data ==&gt; {globaldata}</h3>
        </ul>
    </div>
  )
}

export default Testing