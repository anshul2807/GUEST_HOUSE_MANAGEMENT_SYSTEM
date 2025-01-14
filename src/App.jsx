import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;