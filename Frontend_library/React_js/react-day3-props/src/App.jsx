import Card from "../components/Card"
import Users from "../components/usershowsection/Users"
import Usershow from "../components/usershowsection/Usershow"

const App = () => {


  return (
    <> 
     <section className="">

    {/*  so ham jaise html main attributes use krte hain, props bhi same he syntax say create krna hai or  pass krne hai  

     // for string value 
      props_name = "value"

    ager numbers koi pass krna hai to use this {] 

     // for number value 
      props_number = {100}


    */}

      {/* <Card user="CoderX" email="coderx001001" age={21}/>
      <Card user="CoderZ" email="coderz002002" age={21}/>
      <Card user="CoderY" email="codery0103" age={21}/> */}
      

      <Usershow  />
      {/* <Usershow  /> */}


     </section>
    
    </>
  )
}

export default App