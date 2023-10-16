import { useState } from "react";
import Modal from "react-modal";
import Form from "./Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

Modal.setAppElement("#root");

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        values
      );
      console.log("User registered:", response.data);
      window.location.href = "http://localhost:3000/list/:id";
      Swal.fire({
        title: 'Signin Success',
        text: 'Welcome!',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 3000
      });
    } catch (error) {
      console.error("Registration error:", error.response.data);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    setShowErrorModal(true);
    navigate("/signup/:id");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        {inputs.map((input) => (
          <Form
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="mb-3">Sign In</button>
        <div className="fluid-start">
          <p style={{ fontSize: "12px" }}>
            Don't have an account yet?
            <a onClick={handleLogin}> Create an account</a>
          </p>
          <Modal
            isOpen={showErrorModal}
            onRequestClose={handleCloseErrorModal}
            contentLabel="Login Error"
          >
            <h2>Login Error</h2>
            <p>Incorrect username or password. Please try again.</p>
            <button onClick={handleCloseErrorModal}>Close</button>
          </Modal>
          {/* <p style={{ fontSize: '12px' }}>
      Don't have an account yet? <a href="http://localhost:3000/signup/:id">Create an account</a> 
    </p> */}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
