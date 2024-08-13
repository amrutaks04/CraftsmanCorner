const User = require('../models/userModel');


const createUserProfile = async (req, res) => {
    const { name, phoneNo, address, email, profilePhoto, additionalInfo } = req.body;
    const role = req.role;
    const id = req.authId;
    try {
        if (role == 'user') {
            const profile = await User.create({
                userId: id,
                name,
                phoneNo,
                email,
                address,
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
        return res.status(401).json({ message: 'This is not a user' });
    } catch (err) {
        console.log(err);
    }
}

const editUserProfile = async (req, res) => {
    const { name, phoneNo, address, email, profilePhoto, additionalInfo } = req.body;
    const role = req.role;
    const id = req.authId;
    try {
        if (role == 'user') {
            const edit = await User.updateOne({ userId: id }, {
                $set: {
                    name,
                    phoneNo,
                    email,
                    address,
                    profilePhoto,
                    additionalInfo,
                }
            }, { new: true }
            )
            if (edit) {
                return res.status(200).json({ message: 'Profile updated' });
            }
            else {
                return res.status(404).json({ message: 'Profile not updated' });
            }
        }
        return res.status(401).json({ message: 'This is not a user' });
    } catch (err) {
        console.log(err);
    }
}

const viewUserProfile = async (req, res) => {
    try {
        const id = req.authId;
        const role = req.role;
        if (role == 'user') {
            const find = await User.findOne({ userId: id });
            if (find) {
                return res.status(200).json({ message: 'Profile found', profile: find });
            }
            else {
                return res.status(404).json({ message: 'Profile not found' });
            }
        }
        return res.status(401).json({ message: 'This is not a user' });
    } catch (err) {
        console.log(err);
    }
}

const deleteUserProfile = async (req, res) => {
    try {
        const id = req.authId;
        const role = req.role;
        if (role == 'user') {
            const deletes = await User.deleteOne({ userId: id });
            if (deletes.deletedCount > 0) {
                return res.status(200).json({ message: 'Profile deleted' });
            }
            else {
                return res.status(404).json({ message: 'Profile not deleted' });
            }
        }
        return res.status(404).json({ message: 'This is not a user' });
    } catch (err) {
        console.log(err);
    }
}


module.exports = { createUserProfile, editUserProfile, viewUserProfile, deleteUserProfile };
