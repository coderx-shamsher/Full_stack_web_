// import React from 'react'
// import "../src/App.css" 

// hamne card funcion main props name ka ek parameter pass kiya jis ki help say ham hamare props value koi get kr sakte hain Note: props ek object hai.  parameter ka name kuch bhi ho sakta hai..

const Card = (props) => {
  console.log(props);

  return (
    <>
      <div className="flex items-center justify-center flex-col border border-black w-[29rem] h[20vh]  pt-5 pl-5 pb-5 relative gap-2 bg-zinc-200 rounded-4xl">

        <img className="w-[100px] rounded-3xl  absolute left-[20px]" src="../public/images/miyamoto.png" alt="" />
            <h2 className="font-bold">{props.user}</h2>  
             <p className="">This is The <strong>{props.user}👋🏞️</strong></p>
             <p className=""><i> <strong> {props.email}</strong> @gmail.com</i></p>
             <p> <strong>Age  :  </strong> 
                 <em>
                  {props.age}
                 </em>
              </p>   
      </div>
    </>
  )
}

export default Card