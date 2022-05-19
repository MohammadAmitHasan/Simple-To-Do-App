import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './Compunents/Home/Home';
import Login from './Compunents/Login/Login';
import Navbar from './Compunents/Navbar/Navbar';
import RequireAuth from './Compunents/RequireAuth/RequireAuth';

function App() {
  return (
    <div className='container mx-auto mb-20'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home></Home>
          </RequireAuth>
        }></Route>
        <Route path='/home' element={
          <RequireAuth>
            <Home></Home>
          </RequireAuth>
        }></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
