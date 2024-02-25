import React, { useState } from 'react';
import InputType from './InputType';
import {Link , useNavigate} from 'react-router-dom';
import { handleLogin, handleRegister } from '../../../services/authService';
import axios from 'axios';

const Form = ({formType,submitBtn,formTitle}) => {
  
    const navigate =useNavigate();
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [role,setRole] =useState("user");
    const [name,setName] =useState("");
    const [address,setAddress] =useState("");
    const [phone,setPhone] =useState("");
   
    const handleSubmit = async (e) => {
      //e.preventDefault();
      try{
        let response;
        if (formType === "login") {
          
          const loginData = {
            email,
            password,
            role
          };
          response = await axios.post('http://localhost:3033/api/v1/auth/login', loginData);
          if (role === "user" && response.data.isAdmin) {
            return alert('Error.');
          }  else if (role === "admin" && !response.data.isAdmin) {
            return alert('Invalid credentials for admin login.');
        } else {
          if(role==='user'){
            if (response.status === 200 && response.data.success) {
                // Successful login
                navigate('/userHomepage',{state: {email: email}});
            } 
            else {
                // Invalid Credentials or other errors
                return alert('Invalid Credentials');
            }
            
          }
          else if(role==='admin'){
            if (response.status === 200 && response.data.success) {
              // Successful login
              navigate('/adminHomepage')
          } else {
              // Invalid Credentials or other errors
              return alert('Invalid Credentials');
          }
          }
        }
    }else if (formType === "register") {
          // Handle register form submission
          const registerData = {
            role,
            name,
            email,
            phone,
            address,
            password
          };
          response = await axios.post('http://localhost:3033/api/v1/auth/reg', registerData);
          alert("Registration successful!");
          navigate('/');
         

        }
      }catch (error) {
        console.error("Error submitting form:", error);
      }
    }

  return (
    <>
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleSubmit(handleLogin(e, role, email, password));
          else if (formType === "register")
            return handleSubmit(handleRegister(
              e,
              role,
              name,
              email,
              phone,
              address,
              password
            ));
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />

        {formType === "login" && (
          <div className="d-flex mb-3">
            <div className="form-check ms-2">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="adminRadio"
                value={"admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="form-check-label" htmlFor="adminRadio">
                Admin
              </label>
            </div>
            <div className="form-check ms-2">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="userRadio"
                value={"user"}
                onChange={(e) => setRole(e.target.value)}
                defaultChecked
              />
              <label className="form-check-label" htmlFor="userRadio">
                User
              </label>
            </div>
          </div>
        )}

        {/* Render register form only if the selected role is 'user' */}
        {role === "user" && formType === "register" && (
          <>
            <InputType 
              labelText={"Name"}
              labelFor={"forName"}
              inputType={"text"}
              name={"name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputType
              labelText={"E-mail"}
              labelFor={"forE-mail"}
              inputType={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText={"Phone"}
              labelFor={"forPhone"}
              inputType={"text"}
              name={"phone"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <InputType
              labelText={"Address"}
              labelFor={"forAddress"}
              inputType={"text"}
              name={"address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputType
              labelText={"Set Password"}
              labelFor={"forPassword"}
              inputType={"password"}
              name={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        {/* Login form */}
        {formType === "login" && (
          <>
            <InputType
              labelText={"E-mail"}
              labelFor={"forE-mail"}
              inputType={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText={"Password"}
              labelFor={"forPassword"}
              inputType={"password"}
              name={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        <div className="d-flex flex-row flex-column justify-content-between">
          {/* Render message and link for login page only */}
          {formType === "login" && (
            <>
              {/* Show message for user role */}
              {role === "user" && (
                <p>
                  Not Registered yet?
                  <Link to="/register"> Register Here!</Link>
                </p>
              )}
            </>
          )}

          {/* Render message for register page only */}
          {formType === "register" && (
            <p>
              Already Registered?
              <Link to="/"> Login Here!</Link>
            </p>
          )}
          <button type="submit" className="btn btn-primary">
            {submitBtn}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form