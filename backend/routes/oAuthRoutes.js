import  express from "express";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();
import { OAuth2Client } from 'google-auth-library';

async function getUserData(access_token){
    const response = await fetch(`https://www.googleapis.com/oauth2/v3
                                  /userinfo?access_token${access_token}`);
    const data = await response.json();
    console.log('data', data);
}

router.get('/', async function(req, res, next) {
    const code = req.query.code;
    try{
        const redirectUrl = 'http://localhost:3000';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );
        const res = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(res.tokens);
        console.log('Tokens acquired');
        const user = oAuth2Client.credentials;
        console.log('credentials', user);
        await getUserData(user.access_token);
    } catch(err) {
        console.log('Error with signing in with Google');
    }
})

export default router;