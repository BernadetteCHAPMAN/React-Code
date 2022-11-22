import React, { useState } from "react";
import userServices from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Password Required"),
});

const Login = () => {
  const navigate = useNavigate();

  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
    tenantId: "",
  });

  console.log(userLoginData);
  console.log(setUserLoginData);

  // const onFormFieldChange = (event) => {
  //   console.log("onChange", { syntheticEvent: event });

  //   const target = event.target;

  //   const value = target.value;

  //   const name = target.name;

  //   setUserLoginData((prevState) => {
  //     console.log("updater onChange");
  //     const newUserObject = {
  //       ...prevState,
  //     };
  //     newUserObject[name] = value;
  //     return newUserObject;
  //   });
  // };

  //LOG IN

  const onLoginClick = (values) => {
    console.log("Login is working");

    userServices.loginUser(values).then(onLoginSuccess).catch(onLoginError);
    // userServices
    //   .userLogout(userLoginData)
    //   .then(onLogOutSuccess)
    //   .catch(onLogOutError);

    // setUnknownUserLogIn(!unknownUserLogIn)
    // console.log ("Logging in");
  };

  const onLoginSuccess = (response) => {
    console.log("User LoggedIn", response);
    toast.success("Registration Successful!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
    userServices
      .getCurrentUser()
      .then(onGetCurrentSuccess)
      .catch(onGetCurrentError);
    navigate("/");
  };

  const onLoginError = (err) => {
    console.log("Login error", err);
    toast.error("Error, Please Try Again!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const onGetCurrentSuccess = (response) => {
    console.log(response, "get current user login");
    userServices
      .getCurrentUser()
      .then(onGetByIdSuccess)
      .catch(onGetCurrentError);

    // onGetByIdSuccess => navigate to APP with the information as payload
    // In App recieved this info with the TYPE to validate and update the state
  };

  const onGetByIdSuccess = (response) => {
    console.log("userId logged", response);
  };

  const onGetCurrentError = (err) => {
    console.log(err, "invalid current user");
  };

  //LOGOUT

  // const onLogOut = (response) => {
  //   console.log("User logged out", response);
  //   toast.success("Log out Successful!", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: 2000,
  //   });
  //   userServices.userLogout().then(onLogOutSuccess).catch(onLogOutError);
  //   navigate("/");
  // };

  // const onLogOutError = (err) => {
  //   console.log("Log out unsuccessful", err);
  //   toast.error("Error, Please Try Again!", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: 2000,
  //   });
  // };

  // First user  login
  // on success we should trigger get current user
  //on succes we should trigger get user by id
  // on success update state with users info

  // const handleSubmit = (values) => {
  //   console.log(values);
  //   console.log(values);
  //   var message = `Just Submitted the form with these values and will be clearing form.
  //     ${JSON.stringify(values, null, 2)} `;
  //   //if you want to reset form you can use Formik's own method but you need to pass the object to reset the form to
  //   this.setState({ message });
  //   resetForm(this.state.formData);
  // };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={userLoginData}
      onSubmit={onLoginClick}
      validationSchema={loginSchema}
    >
      <Form>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <Field type="email" name="email" className="form-control" />
          <ErrorMessage name="email" component="div" className="has-error" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field type="password" name="password" className="form-control" />
          <ErrorMessage name="password" component="div" className="has-error" />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </Form>
    </Formik>
  );
};
export default Login;
//React needs the naming conventions: className for "class" and htmlFor for "for", when using BS templating.

// validationSchema={Yup.object().shape({
//   email: Yup.string().required("Required"),
//   password: Yup.string().required("Required"),
// })}

// onSubmit={this.handleSubmit}
// >
// <h1>Login</h1>
// <form>
//   <div className="mb-3">
//     <label htmlFor="exampleInputEmail1" className="form-label">
//       Email Address
//     </label>
//     <input
//       type="email"
//       name="email"
//       value={userLoginData.email}
//       onChange={onFormFieldChange}
//       className="form-control"
//       id="exampleInputEmail1"
//       aria-describedby="emailHelp"
//     />
//   </div>
//   <div className="mb-3">
//     <label htmlFor="exampleInputPassword1" className="form-label">
//       Password
//     </label>
//     <input
//       type="password"
//       name="password"
//       value={userLoginData.password}
//       onChange={onFormFieldChange}
//       className="form-control"
//       id="exampleInputPassword1"
//     />
//   </div>
//   <button
//     type="submit"
//     //disabled={!isValid || isSubmitting}
//     onClick={onLoginClick}
//     className="btn btn-primary"
//   >
//     Log In
//   </button>
// </form>
// </Formik>
// </React.Fragment>
// );
