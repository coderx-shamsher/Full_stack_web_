import React from 'react'
import { useParams } from 'react-router-dom'

const Category = () => {
 
    let params= useParams()
    console.log(params);
    
  return (
      <div >
      <h3 id="myheading"
        style={{
          fontSize: "50px",
          color: "lightpink",
        }}
      > Category page is here </h3>
    </div>
  )
}

export default Category