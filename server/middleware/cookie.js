const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');

app.use(cors({origin:'http://localhost:5173',withCredentials:true}))

const cookie_middleware  = async (req,res,next)=>{

    //  NEED TO WORK ON THIS LATER
    
    // req.cookie.token = 

    next();//
}

module.exports = cookie_middleware;