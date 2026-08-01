import React from 'react'
import TestMain from './components/without/TestMain'
import Testing from './components/withcontext/Testing'

const App = () => {
  return (
    <div>
     
     {/* first why we need context api ese ham props driling mein ane vali probelm se samajte hain , jo ki hai data flow data up to down flow krta hai but kabhi kabhi hme down to up data send krna hota hai to us case mein props drilling work nhi krti acche se so eder eek concept hai context api ka let cook without and than with context api 
      */}
      
      {/* <TestMain/> */}
      
      <header style={{
        backgroundColor : "lightblue",
        width : "full",
        height : "4rem"
      }}>
         <ul style={{
           display : "flex",
           justifyContent : "center",
           alignItems : "center",
           paddingTop  : "15px",
           listStyle : "none",
           color : "black",
           gap : "40px"
         }}>
           <li>home</li>
           <li>about</li>
           <li>contact</li>
         </ul>
      </header>
      
      <Testing/>

    </div>
  )
}

export default App