import React from 'react'

// ager props as object a raha hai to uski fields ka names k hisab se he destructure krna mere object mein ek name, email fields hai 
// ager hame custom props send kr rahe hai to uske name koi use as props use krna  jaise maine  {username, email} yeh dono send kre the
const Usercard = ({name,email}) => {

  return (
    <>
      
       <section className='w-[20rem] h-[10rem] bg-sky-100  relative '>
        <div className='absolute top-1 left-65 uppercase'>
          <h2> {name}</h2>
        </div>
        <div className='absolute bottom-24 left-45'>
          <h3> {email}</h3>
        </div>

       </section>

    
    </>
  )
}

export default Usercard