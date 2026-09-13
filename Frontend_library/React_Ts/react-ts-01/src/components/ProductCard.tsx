// import { count } from 'console'
import React, { useState } from 'react'

// create inerface for incoming data 
interface productdata {
     productname : string,
     price : number
}
const ProductCard = ({productname,price} : productdata) => {

    const [order, setorder] = useState(0)

  return (
    <div>
        {/* <h2>
        ProductCard
        </h2> */}
        <div className="card">
           <h2>{productname}</h2>
           <p>{price}</p>
           <span id='ordercount'> Order Count : {order} </span> <span id='moreorderbtn'> <button onClick={()=>{
             setorder(order + 1)
           }}>{" + "}</button></span>

        </div>
        <div className="butbtn">
             <button onClick={()=>{
                 alert("YOur product added to payment section...")
             }}>Buy</button>
        </div>
    </div>
  )
}

export default ProductCard