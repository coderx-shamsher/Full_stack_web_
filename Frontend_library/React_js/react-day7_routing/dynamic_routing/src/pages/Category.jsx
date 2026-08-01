import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  let usersparams  = useParams();
  console.log(usersparams.courceid);

  return (
    <div>
      <header
        style={{
          fontSize: "50px",
          color: "lightblue",
        }}
      >
        <h2>📚📒 this is {usersparams.courceid} page 🗂️ </h2>


  
      </header>
    </div>
  );
};

export default Category;
