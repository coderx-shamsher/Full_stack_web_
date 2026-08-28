// import React from "react";
import { useState } from 'react';

import './styles/signup.css'
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const requstdata = () => {
    fetch("http://localhost:5050/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      // Step 1: Pehle response ko JSON me badalna zaroori hai
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server ne error response diya!");
        }
        return response.json(); // Yeh backend ka actual data return karega
      })
      // Step 2: Yahan aapko backend ka asli data milega
      .then((data) => {
        // this console the success message 
        console.log("Success Data:", data)
      })
      // Step 3: Agar network fail ho ya CORS error aaye
      .catch((err) => {
        console.log("Error details:", err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert("Form submitted successfully!");

    const inilialFormState = {
      name: "",
      email: "",
      password: "",
    };

    setFormData(inilialFormState);
  };

  return (
    <div>
      <div className="page">
      {" "}
      <div className="form-card">
        {" "}
        <div className="form-header">
          {" "}
          <h1>Create Account</h1> <p>Enter your details to get started.</p>{" "}
        </div>{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <div className="input-group">
            {" "}
            <label htmlFor="name">Full Name</label>{" "}
            <input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />{" "}
          </div>{" "}
          <div className="input-group">
            {" "}
            <label htmlFor="email">Email Address</label>{" "}
            <input
              id="email"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />{" "}
          </div>{" "}
          <div className="input-group">
            {" "}
            <label htmlFor="password">Password</label>{" "}
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />{" "}
          </div>{" "}
          <button type="submit" className="submit-btn" onClick={requstdata}>
            {" "}
            Create Account{" "}
          </button>{" "}
        </form>{" "}
        <p className="login-text">
          {" "}
          Already have an account? <a href="#">Sign in</a>{" "}
        </p>{" "}
      </div>{" "}
    </div>
    </div>
  );
};

export default Signup;
