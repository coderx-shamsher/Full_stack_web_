import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../Form/form.css";

const Form = () => {

  const [isSubmitting, setisSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();



  // const ShowSubmitedData = (data) => {
  //   console.log(data);
  //   //  console.log(watch("username"));
  //   //  console.log(watch("password"));
  // };

  const RequestToBackend = async (data) => {

    setTimeout(() => {
      setisSubmitting(true);
    }, 100);

    let datasend = new Promise((resl, rej) => {
      setTimeout(() => {
        resl(data);
       
        fetch("http://localhost:3000/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      }, 2000);
    })


    datasend.then((data) => {
       console.log(data);
       reset() // for resting the form fields ... 
              
    }).catch((err) => {
       console.log(err);
    });


  };

  return (
    <>
      {isSubmitting && <div>Loading......</div>}
      <form className="formcontainer" onSubmit={handleSubmit(RequestToBackend)}>
        <input
          className="usernameinput"
          type="text"
          placeholder="Enter Your UserName"
          {...register("username", {
            required: { value: true, message: "this required" },
            maxLength: { value: 6, message: "max limit hit" },
            minLength: { value: 4, message: "min limit hit" },
          })}
        />
        {errors.username && (
          <div className="error">{errors.username.message}</div>
        )}

        <input
          className="passwordinput"
          type="password"
          placeholder="Enter Your Password "
          {...register("password", {
            required: { value: true, message: "this required" },
            minLength: { value: 4, message: "You Need 4 chacter minimum" },
          })}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}

        {/* <input className="submitbtn" type="submit" value="submit" /> */}

        <button
          disabled={isSubmitting}
          className="submitbtn"
          onClick={() => {
            setTimeout(() => {
              setisSubmitting(false);
            }, 3000);
          }}>
            click
        </button>
      </form>
    </>
  );
};

export default Form;

