import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [vendorName, setVendorName] = useState("");
    const [vendorAddress, setVendorAddress] = useState("");
    const [vendorLicense, setVendorLicense] = useState("");
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();

        const payload = {
            name: username,
            email: email,
            password:password, 
            role: role,
            vendorName:role=='vendor'?vendorName:undefined,
            vendorAddress:role=='vendor'?vendorAddress:undefined,
            vendorLicense:role=='vendor'?vendorLicense:undefined,
        }

        try {
            const res = await axios.post('https://craftsmancorner-1.onrender.com/register',
                payload)

            toast.success(res.data.message)
            navigate('/login');
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div class='register-layout'>
            <form className="login-form" onSubmit={handleRegister}>
                <label htmlFor="name" className="username">User Name:</label>
                <input type='text' id="name-r" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password" className='password'>Password:</label>
                <input type='password' id='password-r' value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="email" className='email' value={email} >Email:</label>
                <input type='email' id='email-r' onChange={(e) => setEmail(e.target.value)} />
                <div className="radio-group">
                    <input type='radio' id='user-role' name='role' value='user' checked={role === 'user'} onChange={(e) => setRole(e.target.value)} /> <label htmlFor="user-role">User</label>
                    <input type='radio' id='vendor-role' name='role' value='vendor' checked={role === 'vendor'} onChange={(e) => setRole(e.target.value)} /> <label htmlFor="vendor-role">Vendor</label>
                    <input type='radio' id='admin-role' name='role' value='admin' checked={role === 'admin'} onChange={(e) => setRole(e.target.value)} /> <label htmlFor="admin-role">Admin</label>
                </div>
                {role=='vendor' && (
                    <>
                      <label htmlFor="vendorName">Vendor Name:</label>
                      <input type='text' id='vendorName' value={vendorName} onChange={(e) => setVendorName(e.target.value)} />
                      <br />
                      <label htmlFor="vendorAddress">Vendor Address:</label>
                      <input type='text' id='vendorAddress' value={vendorAddress} onChange={(e) => setVendorAddress(e.target.value)} />
                      <br />
                      <label htmlFor="vendorLicense">Vendor License:</label>
                      <input type='text' id='vendorLicense' value={vendorLicense} onChange={(e) => setVendorLicense(e.target.value)} />
                      <br />
                      </>
                )}
                <button className='login-button' type='submit'>Register</button>
                <br />
                <span>Click here to login</span>
                <Link to='/login'> <span>Login</span></Link>
            </form>
        </div>
    )
}
export default Register;