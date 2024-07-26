

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import RegistrationForm from './components/Register';

function App() {
  return (
    <div>
      {/* <Router> */}
      
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
     
    {/* </Router> */}
    </div>
  );
}

export default App;
