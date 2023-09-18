const express = require('express')
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const auth = require('../middleware/auth')
app.use(cors({origin: "http://localhost:5173" , withCredentials : true}))
const User = require('../models/user')
app.use(express.json());

app.use(cookieParser())

app.post('/api/users/getCookie', async ( req,res)=>{
    // return res
    // .status(202)
    // .cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
    // .send("Cookie initialized")

    try{

        const user = await User.findByCredentials(req.body.email,req.body.password);
        if(!user) return res.status(404).send('user not found')
        // //console.log(user)
        user.getPublicData();
        const token = await user.generateAuthToken(); 
        //console.log('inside user login api')
        const data = await user.getPublicData();
        
        /// IMPORTANT NOTE : user.getPublicDate returns a promise so make sure to get data sepeartely 
        // i.e u cannot get data by directly doing user.getPublicData() as this returns a promise 
        //so make sure to use await or use then() to resolve then promise 
       
       
       //console.log(data);
        // return res.status(200).send({user:data,token});
    
        return res
        .status(200)
        .cookie('token',token, {

             sameSite : 'strict',
             path: "/",
             expires : new Date( new Date().getTime() +  5* 1000),
             httpOnly: true ,
            //  secure  : true  set this  to true if actual domain is used
        })
        .cookie('user',data.name, {

            sameSite : 'strict',
            path: "/",
            expires : new Date( new Date().getTime() +  5* 1000),
            httpOnly: true ,
           //  secure  : true  set this  to true if actual domain is used
       })
        .send("SUCCESSFULLY LOGGED IN");
      }
    catch(err){
      return res.status(404).send(err.message);
    }
})