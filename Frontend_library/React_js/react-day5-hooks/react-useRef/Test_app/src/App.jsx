import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Test from "./pages/Test";

function App() {
  const [count, setCount] = useState(1);
  
  // let test_num = 1

  // set initlial value with useRef()
  let num = useRef(0)

  useEffect(()=>{
    // test_num + 1;
    // console.log(`Re-rending.......  ${test_num}`)


    // now hame .current ki help se values ko get krte hain 
    //console.log(num.current);   // jaise he count par click krne par state change hoti hai to hame 0 print hota milta hai
    //console.log(num);           // hame ek object mil rahi hai 
    
    num.current = num.current + 1 
    console.log(`Re-rending.......  ${num.current}`) // now jaise he ham state change kr rahein hai value bhi increament ho rahi hai  num ki ... 
  })

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <Test/>
    </>
  );
}

export default App;
