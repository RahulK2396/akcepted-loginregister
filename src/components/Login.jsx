import React, { useState } from "react";
import "./LoginPage.css"; // Import CSS file
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebase";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const showToastMessage = (message) => {
    toast.success(message, {
        position: "top-right",
        transition: Slide
    });
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    if (!hasUpperCase)
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    if (!hasLowerCase)
      newErrors.password =
        "Password must contain at least one lowercase letter.";
    if (!hasNumber)
      newErrors.password = "Password must contain at least one number.";
    if (!hasSpecialChar)
      newErrors.password =
        "Password must contain at least one special character.";
    if (!hasMinLength)
      newErrors.password = "Password must be at least 8 characters long.";
    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
        showToastMessage ("Login successful!");
       setErrors({});
      // Perform login logic here
      console.log("Logging in with", email, password);
    }
  };

  const handleForgotPassword = () => {

    setForgotPassword(true);
    
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Perform forgot password logic here
    console.log("Password reset for", email);
    // setForgotPassword(false); // Close forgot password form
    setEmailSent(false);
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
        setErrors({});

        try {
          await auth.sendPasswordResetEmail(email);
          console.log("Password reset email sent!");
          showToastMessage ("Email sent!");
          
        } catch (err) {
          console.log('Error sending password reset email.');
          
        }
      
      
    }
  };
    
    
  

  return (
    <div className="login-container">
      {!forgotPassword ? (
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${errors.email ? "error" : ""}`}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-control ${errors.password ? "error" : ""}`}
              />
              <i
                className={`fas ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } eye-icon`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="forgot-password-container">
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
            <p className="forgot-password" onClick={handleForgotPassword}>
              Forgot Password?
            </p>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleForgotPasswordSubmit}
          className="forgot-password-form"
        >
          <h2>Forgot Password ?</h2>
          <div className="form-group">
            <label htmlFor="forgot-email"> Enter Your Email</label>
            <input
              type="email"
              id="forgot-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${errors.email ? "error" : ""}`}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <button 
        
          type="submit"
           className="btn">
            Submit
          </button>

          <p className="back-to-login" onClick={() => setForgotPassword(false)}>
            Back to Login
          </p>
        </form>
      )}
      <ToastContainer />
    </div>
    
  );
};

export default LoginPage;
