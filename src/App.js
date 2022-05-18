import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AllTodos from './Compunents/AllTodos/AllTodos';
import Home from './Compunents/Home/Home';
import Login from './Compunents/Login/Login';
import Navbar from './Compunents/Navbar/Navbar';

function App() {
  return (
    <div className='container mx-auto'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/allTodos' element={<AllTodos></AllTodos>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
