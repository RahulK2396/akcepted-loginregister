import React, { useState } from 'react';
import './LoginPage.css'; // Import CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Perform login logic here
      console.log('Logging in with', email, password);
    }
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    // Perform forgot password logic here
    console.log('Password reset for', email);
    // setForgotPassword(false); // Close forgot password form
    setEmailSent(false); 

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
              className={`form-control ${errors.email ? 'error' : ''}`}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-control ${errors.password ? 'error' : ''}`}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <button type="submit" className="btn">Login</button>
          <p className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</p>
        </form>
      ) : (
        <form onSubmit={handleForgotPasswordSubmit} className="forgot-password-form">
          <h2>Forgot Password</h2>
          <div className="form-group">
            <label htmlFor="forgot-email">Email</label>
            <input
              type="email"
              id="forgot-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${errors.email ? 'error' : ''}`}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <button type="submit" className="btn">Submit</button>
         
          <p className="back-to-login" onClick={() => setForgotPassword(false)}>Back to Login</p>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
