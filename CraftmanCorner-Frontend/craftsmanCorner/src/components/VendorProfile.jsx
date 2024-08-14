
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import VendorProduct from "./VendorProduct";


const VendorProfile = () => {
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [email, setEmail] = useState("");
    const [link, setLink] = useState("");
    const [exp, setExp] = useState("");
    const [des, setDes] = useState("");
    const [type, setType] = useState("");
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
            vendorId: authId,
            vendorName: name,
            vendorAddress: address,
            phoneNo: phoneno,
            email: email,
            socialMediaLink: link,
            businessDescription: des,
            businessType: type,
            yearsOfExperience: exp,
            profilePhoto: photo,
            additionalInfo: addInfo,
        }

        try {
            const res = await axios.post("http://localhost:3000/vendor/createVendorProfile", payload, {
                headers: {
                    Authorization:`Bearer ${token}`
                }
            })
            toast.success(res.data.message);
            getProfile();
            navigate('/vendorprofile')

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    const getProfile = async (e) => {
        try {
            const res = await axios.get("http://localhost:3000/vendor/viewVendorProfile",
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
                <div className='vendor-profile'>
                    <h2>{profile.vendorName}'s Profile</h2>
                    <p><b>Name:</b>{profile.vendorName}</p>
                    <p><b>Address: </b>{profile.vendorAddress}</p>
                    <p><b>Phone:</b> {profile.phoneNo}</p>
                    <p><b>Email:</b> {profile.email}</p>
                    <p><b>Social Media:</b><a href={profile.socialMediaLink}>{profile.socialMediaLink}</a></p>
                    <p><b>Business Description:</b> {profile.businessDescription}</p>
                    <p><b>Business Type:</b>{profile.businessType}</p>
                    <p><b>Years of Experience: </b>{profile.yearsOfExperience}</p>
                    {/* <p>Additional Info: {profile.additionalInfo}</p> */}
                </div>):(
            <div className="vendorProfile">
                <form className='vendorForm' onSubmit={createProfile}>
                    <label htmlFor="name">Name:</label>
                    <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="address">Address:</label>
                    <input type='textarea' id='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                    <label htmlFor="phoneno">Phoneno:</label>
                    <input type='text' id='phoneno' value={phoneno} onChange={(e) => setPhoneno(e.target.value)} />
                    <label htmlFor="phoneno">Email:</label>
                    <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="link">Social Media Link:</label>
                    <input type='text' id='link' value={link} onChange={(e) => setLink(e.target.value)} />
                    <label htmlFor="des">Business Description:</label>
                    <input type='text' id='des' value={des} onChange={(e) => setDes(e.target.value)} />
                    <label htmlFor="type">Business Type:</label>
                    <input type='text' id='type' value={type} onChange={(e) => setType(e.target.value)} />
                    <label htmlFor="experience">Years Of Experience:</label>
                    <input type='number' id='experience' value={exp} onChange={(e) => setExp(e.target.value)} />
                    <label htmlFor="photo">Profile Photo:</label>
                    <input type='text' id='photo' value={photo} onChange={(e) => setPhoto(e.target.value)} />
                    {/* <label htmlFor="info">Additional Info:</label>
                    <input type='textarea' id='info' value={addInfo} onChange={(e) => setAddinfo(e.target.value)} /> */}
                    <button className='profile-create-button' type='submit'>Create Profile</button>

                </form>
            </div>
                )}
                <VendorProduct/>
        </>
    )
}
export default VendorProfile;
 