import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    const [role,setRole]= useState("");
    const dispatch = useDispatch();
    const navigate =useNavigate();

    const handleUsername =(e)=>{
        setUsername(e.target.value);
    }
    const handlePassword =(e)=>{
        setPassword(e.target.value);
    }
    const handleRole =(e)=>{
        setRole(e.target.value);
    }

    const handleLogin= async(e)=>{
        e.preventDefault();
        const payload ={
            name:username,
            password:password,
            role:role
        }
try{
    const res = await axios.post('http://localhost:3000/login',
        payload 
    )

    dispatch(setToken(res.data.token));

    localStorage.setItem("token",res.data.token);
    toast.success(res.data.message);
    navigate("/")

}catch(error){
toast.error(error.response.data.message);
}

    }
return(
    <div class='login-layout'>
        <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="name" className="username" >User Name :</label>
            <input type='text' id="name" value={username} onChange={handleUsername}/>
            <br/>
            <label htmlFor="password" className='password' >Password:</label>
            <input type='password' id="password" value={password} onChange={handlePassword}/>
            <br/>
            <input type='radio' id='user-role' name='role' value='user' checked={role=='user'} onChange={handleRole}/> <label htmlFor="user-role">User</label>
<input type='radio' id='vendor-role'  name='role' value='vendor' checked={role=='vendor'} onChange={handleRole}/> <label htmlFor="vendor-role">Vendor</label>
<input type='radio' id='admin-role' name='role' value='admin' checked={role=='admin'} onChange={handleRole}/> <label htmlFor="admin-role">Admin</label>
<br/>
          <button className='login-button' type='submit'>Login</button>
            <br/>
            <span>Haven't registered yet?</span>
           <Link to='/register'> <span>Register</span></Link>
        </form>
    </div>
)
}
export default Login;