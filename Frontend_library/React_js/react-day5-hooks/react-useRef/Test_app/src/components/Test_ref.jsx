import {useRef, useEffect} from 'react'
const Test_ref = () => {
  
  // --> this the second use case of useRef ( dom manipluation using the useRef ) 
  
  // 1) ref create krna hai element ka 
  const h2Ref = useRef() 
  
  const gmailRef = useRef()
  
  // useEffect 
  useEffect(()=>{
    // 2) hamne dom manipulation kiya 
    h2Ref.current.style.color = "lightblue"
  })

    return (
    <div style={{
        marginBottom : '10rem'
    }}>
        
        {/* 3) add kiya ref  */}
         <h2 ref={h2Ref}>this is testing heading .</h2>
         <p>Useradmin</p>
         <p ref={gmailRef}>test12x0@gmail.com</p>
       
       <div> 
           <p>tap to change the color or gmail</p>
            <button onClick={()=>{
                 gmailRef.current.style.color = "lightpink"
            }}>change color</button>
       </div>
    </div>
  )
}

export default Test_ref