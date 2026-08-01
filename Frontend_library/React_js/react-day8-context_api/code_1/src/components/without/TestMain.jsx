import React from 'react'
import TestNav from './TestNav'
import TestCode from './TestCode';

const TestMain = () => {
    
    let theme = ["light","dark"];
    return (
       <div>
         {/* lets pass the theme variable to Testcode component  */}
         <h3>This is the main test component sending data to Textcode </h3>
        {/* <TestCode theme={theme} /> */}

        {/* important concept of using components  
        
         ham components ko <comp/> ese use krte hain 
           
         but ham ese bhi use kr skate hain 

         <com>
              jo bhi ham eske ander pass krte hain vo es component ka childern hoga..  yeh kaise dekna hai let cook   

         </com>
        */}
           
           <TestCode  theme={theme} hi={'heloo'}>
                   <h3>this is childern of testcode component </h3>
           </TestCode> 
  
            {/* // now go into testcode component and checkout the props in console */}

     </div>
  )
}

export default TestMain