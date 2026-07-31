import React from 'react'

const App = () => {

  function changeuser(){
     console.log('button is clicked');
  }

  return (
    <>
       
       <div className="main">
          
          <h2>hello its react functions</h2>


{/* using the onclick={} hame event listener ko use kr skate hain k click par ki action parformed ho */}
          <button onClick={changeuser}>change user</button>

       </div>
    
    </>
  )
}

export default App