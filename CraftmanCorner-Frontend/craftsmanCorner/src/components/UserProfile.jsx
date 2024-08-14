
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import UserOrders from "./UserOrders";


const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState("");
    const [addInfo, setAddinfo] = useState("");

    const navigate=useNavigate();

    const token = useSelector((state) => state.user.token);

    const authId = localStorage.getItem("authId");

    useEffect(() => {
        if(token){
            getProfile();
        }
            }, []);

    const createProfile = async (e) => {
        e.preventDefault();
        const payload = {
            userId: authId,
            name:name,
            phoneNo: phoneno,
            email: email,
            address: address,
            profilePhoto: photo,
            additionalInfo: addInfo,
        }

        try {
            const res = await axios.post("http://localhost:3000/user/createUserProfile", payload, {
                headers: {
                    Authorization:`Bearer ${token}`
                }
            })
            toast.success(res.data.message);
            getProfile();
            navigate('/userprofile')

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    const getProfile = async (e) => {
        try {
            const res = await axios.get("http://localhost:3000/user/viewUserProfile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
setProfile(res.data.profile);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
           {profile ? (
                <div className='user-info'>
                    <h2>{profile.name}'s Profile</h2>
                    <p><b>Name:</b>{profile.name}</p>
                    <p><b>Address:</b> {profile.address}</p>
                    <p><b>Phone:</b> {profile.phoneNo}</p>
                    <p><b>Email:</b> {profile.email}</p>
                    {/* <p>Additional Info: {profile.additionalInfo}</p> */}
                </div>):(
            <div className="userProfile">
                <form className='userForm' onSubmit={createProfile}>
                    <label htmlFor="fname"> Name:</label>
                    <input type='text' id='fname' value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="address">Address:</label>
                    <input type='textarea' id='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                    <label htmlFor="phoneno">Phoneno:</label>
                    <input type='text' id='phoneno' value={phoneno} onChange={(e) => setPhoneno(e.target.value)} />
                    <label htmlFor="phoneno">Email:</label>
                    <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="photo">Profile Photo:</label>
                    <input type='text' id='photo' value={photo} onChange={(e) => setPhoto(e.target.value)} />
                    {/* <label htmlFor="info">Additional Info:</label>
                    <input type='textarea' id='info' value={addInfo} onChange={(e) => setAddinfo(e.target.value)} /> */}
                    <button className='profile-create-button' type='submit'>Create Profile</button>

                </form>
            </div>
                )}
                <UserOrders/>
        </>
    )
}
export default UserProfile;
 