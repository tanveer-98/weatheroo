
// const {sendCancellationEmail,sendForgotPassword,sendWelcomeEmail} = require('../mail/account');
const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth');
const sharp = require('sharp');
const Blog = require('../models/blog')
router.get("/users", async (req, res) => {
  //console.log('inside GET users')
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(403).send(err);
  }
});

router.get('/users/me',auth,async (req,res)=>{
  // res.send('hello')
  res.send({user:req.user})
})


router.get("/users/:id", async (req, res) => {
  const _id = req.params.id; // no need to convert string id to object id , it's taken care by mongoose
  try {
    const user = await User.find({ _id });
    res.status(201).send(user);
  } catch (err) {
    res.status(404).send(err);
  }

  //  await  User.find({_id})
  //   .then(users=> res.status(200).send(users))
  //   .catch(err => res.send(err));
});
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err);
  }

  // below code can be simplified using await keyword
  user
    .save()
    .then(() => {
        res.status(200).send("successfully added user");
    })
    .catch((err) => {
    res.status(400).send(err);
    });
});

// UPDATE USER PROFILE
router.patch('/users/me',auth,async (req,res)=>{
  const updates = Object.keys(req.body);
  //console.log('updates')
  //console.log(updates);
  const validupdates = ['name','email','password','age'];
  const isValidOperation = updates.every(element=>validupdates.includes(element));
  if (!isValidOperation) return res.status(400).send("invalid update request");
  const user  = req.user;
   updates.forEach(x=>{
     user[x] = req.body[x];
   })         
  await user.save();  
  return res.status(200).send({message:'Password changed',token:req.token});
})

router.patch("/users/me/updateProfile", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  //console.log(updates);
  const allowedUpdates = ["name", "email", "password", "age","profileurl","aboutme"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  //console.log(isValidOperation);
  if (!isValidOperation) return res.status(400).send("invalid update request");

  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body);
    // if (!user) return res.status(404).send("user not found");

    // Note: Note :  findbyIdAndUpdate() bypassed mongoose schema , it directly updates into the database.

    //So we we try to do something like pre middlewares it won't give any //console.log statements

    const user = await User.findById(req.user._id);
    if (!user || user == null) {
      return res.status(404).send("user not found");
    }

    updates.forEach((update) => {
      // accessing property dynamically
      user[update] = req.body[update];
    });

    await user.save();

    // update profileurl for blogs 
      
    const updatedBlogs = await Blog.updateMany({owner: req.user._id},{
      profileurl : req.body.profileurl
    })
    
    console.log(req.body.profileurl);
    // console.log("UPDATED BLOGS: ",updatedBlogs)

    return res.send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post('/users/logout',auth,async (req,res)=>{
  try{
    req.user.tokens = req.user.tokens.filter(tokenElement=>tokenElement.token!=req.token)
    await req.user.save() ; 

    return res.status(200).send({user:req.user,token:''});
  }
  catch(e){
    return res.status(404).send(e.message);
  }
})


router.post('/users/logoutAll',auth,async(req,res)=>{
  try{
    req.user.tokens = [];
    await req.user.save();
    return res.status(200).send(req.user);
  }
   catch(e){
    return  res.status(400).send(e.message)
   }
})

router.post('/users/login',async (req,res)=>{
  try{

      const user = await User.findByCredentials(req.body.email,req.body.password);
      if(!user) return res.status(404).send('user not found')
      // //console.log(user)
      user.getPublicData();
      // const token = await user.generateAuthToken(); 
      //console.log('inside user login api')
      const data = await user.getPublicData();

      /// IMPORTANT NOTE : user.getPublicDate returns a promise so make sure to get data sepeartely 
      // i.e u cannot get data by directly doing user.getPublicData() as this returns a promise 
      //so make sure to use await or use then() to resolve then promise 
     
     
     //console.log(data);
      // return res.status(200).send({user:data,token});
  
      return res.status(200).send({user:data});
    }
  catch(err){
    return res.status(404).send(err.message);
  }
})

router.post('/users/signup',async (req,res)=>{
    const user = new User(req.body);
    try{
      await user.save() ;
      // sendWelcomeEmail(req.body.email,req.body.name); 
    }
    catch(error){
        if (error.code == "11000" && error.keyValue.email ==  `${user.email}`)
        return res.status(400).send({message:"Email is already Registered"})
        // throw new Error({message : "Email is already Registered"})
    }
    const token = await user.generateAuthToken();
    return res.status(200).send({user,token});
})


// const express = require('express')


router.post('/users/getCookie', async ( req,res)=>{
    //console.log('USERS GET COOKIE REQUESTED')
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
        // //console.log('inside user login api')
        const data = await user.getPublicData();
        
        /// IMPORTANT NOTE : user.getPublicDate returns a promise so make sure to get data sepeartely 
        // i.e u cannot get data by directly doing user.getPublicData() as this returns a promise 
        //so make sure to use await or use then() to resolve then promise 
       
       
      //  //console.log(data);
        // return res.status(200).send({user:data,token});
        // res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
        // res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript'],"HttpOnly;Secure;SameSite=Strict");
        // res.setHeader('Set-Cookie','visited=true; Max-Age=3000; HttpOnly,SameSite=None,Secure');
        return res
        .status(200)
        .cookie('token',token, {
             sameSite : 'strict', // set to strict for local developerment else none
             path: "/",
             expires : new Date( new Date().getTime() +  5000* 1000),
             httpOnly: true ,
            //  secure : true
            secure : false// incase of development set to false else cookie wont be saved in postman
        })


        // rule : set to strict and secure :false if you are not allowing your cookies to be used in other domains 
        // set to none and secure : true if you are allowing your cookies to be used in 3rd party context

       // NOTE : in case you are using https:// you have to set sameSite: 'none' and secure : false  or you want cross-site requests enabled 
       // strict and lax is only allowed to have same site cross-site requests 
       
      //   .cookie('user',data.name, {

      //       sameSite : 'strict',
      //       path: "/",
      //       expires : new Date( new Date().getTime() +  5* 1000),
      //       httpOnly: true ,
      //      //  secure  : true  set this  to true if actual domain is used
      //  })
        .send("SUCCESSFULLY LOGGED IN");
      }
    catch(err){
      return res.status(404).send(err.message);
    }
})

router.post("/cookies", async (req,res) =>{
  //console.log("COOKIE VALUES")
  // //console.log(req.cookies)
  return res.status(200).send(req.cookies.token)
})


const findUnion = (arg1, arg2)=>{
  return new Array(... new Set([...arg1,...arg2]));
}


// @POST /interest
router.post("/users/me/interest", auth, async (req,res) =>{

  const {firstlogin} = req.query;
  // console.log(firstlogin)
  if(firstlogin && JSON.parse(firstlogin)){
    // if first login is true then set firstlogin to false in backend 
    const user =  await User.findOneAndUpdate({_id:req.user._id},{firstTimeLogin:false});
    // console.log('inside')
  }
    const found = await User.findOne({_id:req.user._id},{_id:0,interested:1});
    const existing_interests = await User.findOneAndUpdate({_id:req.user._id},
      {
        interested :  findUnion ( found.interested, req.body.tags)
      },{new:true});
  
    return res
    .status(200)
    .send({message:'Successfully Update Posts',posts: existing_interests.interested})
  
 
})


router.get('/users/me/interest',auth, async (req,res)=>{
    
    const found = await User.findOne({_id:req.user._id},{_id:0,interested:1});


    return res.status(200).send({message:'successfully fetched',interest:found.interested})
})

router.get('/users/')
module.exports = router; // DEFAULT EXPORT  

// exports = {
// // this is named export
// }
