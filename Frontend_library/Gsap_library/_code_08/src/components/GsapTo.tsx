import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './style.gsapto.css'

const GsapTo = () => {
    // first hame use krna hoga useGsap() hook! 

  useGSAP(()=>{
     gsap.to("#box1",{
        x : 400,
        duration : 2,
        // delay : 1
        repeat : -1,
        yoyo : true, // for in and out smooth animation !  
       
        // ease 
        ease : "circ.in" // this give specific effect on elements 
     })

     gsap.to("#box2",{
       y : 200,
       duration : 2,
       delay : 1,
       yoyo : true,
       repeat : -1
      })

     gsap.to("#box3",{
       x : 250,
       y : 180 ,
       duration : 2,
       delay : 1,
       yoyo : true,
       repeat : -1,
       rotation : 360
      })
  })

  return (
     <>
     <div className="main">
      
       <div className="title">
           <h2>Gsap To </h2>
          <p> The <code>gsap.to()</code> method is used to animate elements from their current state to a new state. </p>

          <p> the <code>gsap.to()</code> is similar to the <code>gsap.from()</code> method but the differ is that the .to method animates elements from their current state to a new state, while the from animates elements from a new state to their current state </p>
       
       </div>
       
     </div>

       <div className="boxs">
         <div className="box" id='box1'>Box Move in X Axis !</div>
         <div className="box" id='box2'>Box Move In Y Axis !</div>
         <div className="box" id='box3'>Rotation 360 with x and y </div>

       </div>

  

    </>     
  )
}

export default GsapTo