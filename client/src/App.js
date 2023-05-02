import logo from './logo.svg';
import './App.css';
import {NavLink,Routes,Route, useNavigate} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/slice/authSlice';
import { useEffect } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  
  const {user}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const signoff=()=>{
    dispatch(logout())
    


  }
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[user])
  return (
    <>
    <div className='navbar'>
    <h1>Authentification Workshop</h1>
    <div className='links'>
      {user?<> <NavLink to="/me">dashboard</NavLink> <button onClick={signoff} >logout</button></>:<>
      <NavLink to="/register">register</NavLink>
    <NavLink to="/login">login</NavLink>
   
      </>}
   
    </div>
    </div>
    <div className='content'>
    <Routes>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/me" element={<Dashboard></Dashboard>}></Route>
    </Routes>
    </div>
    <ToastContainer></ToastContainer>
  
    </>
  );
}

export default App;
