import  express from "express";
const router = express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
 } from "../controllers/userController.js";
import {protect, admin} from '../middleware/authMiddleware.js';
//import dotenv from "dotenv";
//dotenv.config();
//import { OAuth2Client } from 'google-auth-library';


router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserByID).put(protect, admin, updateUser);
/*
router.post('/', async function(res, req, next) {
    res.header('Access-Control-Allow-Origin','http://localhost:3000');
    res.header('referrer-policy', 'no-referrer-when-downgrade');

    const redirectUrl = 'http://localhost:3000';

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type:'offline',
        scope:'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt:'consent'
    });

    res.json({url:authorizeUrl});
}); */

export default router;