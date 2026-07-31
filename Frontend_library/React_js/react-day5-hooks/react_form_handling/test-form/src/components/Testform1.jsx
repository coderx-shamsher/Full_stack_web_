import React from "react";

const Testform1 = () => {
  return (
    <div className="userform">
      <form action="" onSubmit={(e)=>{
          e.preventDefault()
            console.log("form is submited");
            
        }}>
        <input type="text" placeholder="Enter Your Username" 
        onChange={(e)=>{
            // console.log(e); // give event object
            // console.log(e.target); // give you input element jis par bhi onchange laga hai 
            console.log(e.target.value); // us element ki values 
        }} />
        <button >Submit</button>
      </form>
    </div>
  );
};

export default Testform1;

// 1) hamne ke form create kra hai or ek event lagya form par onsubmit , jab bhi form submit hoga to console run hoga.. but jab form submit horaha hai to page reload ho rha hai or esiliye test bhi theek se console par show nhi ho rha to es case mein ham form koi prevent krte hai or yeh reload ek default behaviour hai form ka 

// 2)  use the event.preventDefualt() method in you form handling function. 
// yeh to ho gya basic form handle defualt prevent handling 

// 3 ham esi event variable ki help say input mein type ho rhi values ko bhi get kr skate hain..
// keoki ham kuch change kr rhe hai to hat type ki gyi value hame chaahie to use the onchange() event on the each input ji ji ki value show krvani hai console par 

    //   onChange={(e)=>{
    //         // console.log(e); // give event object
    //         // console.log(e.target); // give you input element jis par bhi onchange laga hai 
    //         console.log(e.target.value); // us element ki values 
    //     }} />

