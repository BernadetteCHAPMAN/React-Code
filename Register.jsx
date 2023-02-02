
import React, { useState } from "react";
import userService from "../../services/userServices"; //* means ALL
import {useNavigate} from "react-router-dom";
import {toastr} from "toastr";
import "react-toastify/dist/ReactToastify.css";

function Register () {
  const navigate = useNavigate();


  const [ userFormData, setUserFormData ] = useState ({ 
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "U03RX3YQN9J", 
  }) 
  console.log(userFormData);
  const onFormFieldChange = (event) => {
    console.log("onChange", { syntheticEvent: event });
   
    const target = event.target;
   
    const value = target.value;
  
    const name = target.name;
 
    setUserFormData((prevState) => {
      console.log("updater onChange");
  
      const newUserObject = {
        ...prevState,
      };
    
      newUserObject[name] = value;
  
      return newUserObject;
    });
  };


 const onRegisterClick = e => {
  console.log("onClick is working")
  e.preventDefault();

  userService.registerUser(userFormData).then(onSuccess).catch(onError);
 } 
  
  const onSuccess = (response) => {
  console.log("click ok", response);

 //TOAST
 toastr.success("Registration Successful!");
navigate("/Login")
}
const onError = (err) => {
  console.log("click error", err);
  //TOAST
  toastr.error("Error, Please Try Again!");
  
}
  return (
    <React.Fragment>
      <h1>Register</h1>
      <form className="mx-1 mx-md-4">
<div className="d-flex flex-row align-items-center mb-4">
  <i className="fas fa-user fa-lg me-3 fa-fw"></i>
  <div className="form-outline flex-fill mb-0">
    <input type="text" value={userFormData.firstName} onChange={onFormFieldChange} name="firstName" id="form3Example1c" className="form-control" />
    <label className="form-label" htmlFor="form3Example1c">First Name</label>
  </div>
</div>
<div className="d-flex flex-row align-items-center mb-4">
  <i className="fas fa-user fa-lg me-3 fa-fw"></i>
  <div className="form-outline flex-fill mb-0">
    <input type="text" value={userFormData.lastName} onChange={onFormFieldChange}  name="lastName" id="form3Example1c" className="form-control" />
    <label className="form-label" htmlFor="form3Example1c">Last Name</label>
  </div>
</div>
<div className="d-flex flex-row align-items-center mb-4">
  <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
  <div className="form-outline flex-fill mb-0">
    <input type="email" value={userFormData.email} onChange={onFormFieldChange}  name="email" id="form3Example3c" className="form-control" />
    <label className="form-label" htmlFor="form3Example3c">Your Email</label>
  </div>
</div>
<div className="d-flex flex-row align-items-center mb-4">
  <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
  <div className="form-outline flex-fill mb-0">
    <input type="password" value={userFormData.password} onChange={onFormFieldChange} name="password" id="form3Example4c" className="form-control" />
    <label className="form-label" htmlFor="form3Example4c">Password</label>
  </div>
</div>
<div className="d-flex flex-row align-items-center mb-4">
  <i className="fas fa-key fa-lg me-3 fa-fw"></i>
  <div className="form-outline flex-fill mb-0">
    <input type="password" value={userFormData.passwordConfirm} onChange={onFormFieldChange} name="passwordConfirm" id="form3Example4cd" className="form-control" />
    <label className="form-label" htmlFor="form3Example4cd">Confirm your password</label>
  </div>
</div>
<div className="d-flex flex-row align-items-center mb-4">
  <i className="fas fa-user fa-lg me-3 fa-fw"></i>
  <div className="form-outline flex-fill mb-0">
    <input type="text" value={userFormData.avatarUrl} onChange={onFormFieldChange} name="avatarUrl" id="form3Example1c" className="form-control" />
    <label className="form-label" htmlFor="form3Example1c">Profile URL</label>
  </div>
</div>

<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
  <button type="button" onClick={ onRegisterClick } className="btn btn-primary btn-lg">Register</button>
</div>
</form>
    </React.Fragment>
  );
}
export default Register;
