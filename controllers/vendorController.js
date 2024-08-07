const Vendor = require('../models/vendorModel');

const createProfile = async (req, res) => {
    const { vendorName, vendorAddress, phoneNo, email, socialMediaLink, businessDescription, businessType, yearsOfExperience, profilePhoto, additionalInfo } = req.body;
    const role = req.role;
    const id = req.authId;
    try {
        if (role == 'vendor') {
            const profile = await Vendor.create({
                vendorId: id,
                vendorName,
                vendorAddress,
                phoneNo,
                email,
                socialMediaLink,
                businessDescription,
                businessType,
                yearsOfExperience,
                profilePhoto,
                additionalInfo,
            })
            if (profile) {
                return res.status(200).json({ message: 'Profile created' });
            }
            else {
                return res.status(404).json({ message: 'Profile not created' });
            }
        }
        return res.status(401).json({ message: 'This is not a vendor' });
    } catch (err) {
        console.log(err);
    }
}

const editProfile = async (req, res) => {
    const { vendorName, vendorAddress, phoneNo, email, socialMediaLink, businessDescription, businessType, yearsOfExperience, profilePhoto, additionalInfo } = req.body;
    const role = req.role;
    const id = req.authId;
    try {
        if (role == 'vendor') {
            const edit = await Vendor.updateOne({ vendorId: id }, {
                $set: {
                    vendorName,
                    vendorAddress,
                    phoneNo,
                    email,
                    socialMediaLink,
                    businessDescription,
                    businessType,
                    yearsOfExperience,
                    profilePhoto,
                    additionalInfo,
                }
            }, { new: true }
            )
            if (edit.matchedCount > 0 && edit.modifiedCount > 0) {
                return res.status(200).json({ message: 'Profile updated' });
            }
            else {
                return res.status(404).json({ message: 'Profile not updated' });
            }
        }
        return res.status(401).json({ message: 'This is not a vendor' });
    } catch (err) {
        console.log(err);
    }
}

const viewProfile =async(req,res)=>{
    try{
const id=req.authId;
const role=req.role;
if(role=='vendor'){
const find = await Vendor.findOne({vendorId:id});
if(find){
    return res.status(200).json({message:'Profile found',profile:find});
}
else{
    return res.status(404).json({message:'Profile not found'});
}
}
return res.status(401).json({message:'This is not a vendor'});
    }catch(err)
{
console.log(err);
}}

const deleteProfile = async(req,res)=>{
    try{
const id=req.authId;
const role=req.role;
if(role=='vendor'){
  const deletes = await Vendor.deleteOne({vendorId:id});
  if(deletes.deletedCount>0){
    return res.status(200).json({message:'Profile deleted'});
  }
  else{
    return res.status(404).json({message:'Profile not deleted'});
  }
}
return res.status(404).json({message:'This is not a vendor'});
    }catch(err){
        console.log(err);
    }
}


module.exports = { createProfile, editProfile,viewProfile,deleteProfile};