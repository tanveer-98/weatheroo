const mongoose = require("mongoose");

// BLOG Schema:

const blogSchema = new mongoose.Schema(
  {
    
    title:{
        type: String, 
        required: true,
        trim:  true
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'User'
    },
    ownerName:{
      type: String,
      required:true,
      ref :'User'
    },
    profileurl : {
      type: String, 
      ref :'User',
      trim : true
    },
    
    likes:{
      type:Number, 
      default : 0
    },
    dislikes:{
      type:Number,
      default : 0
    },
    tags:{
      type: [String]
    }
  },
  {
    timestamps:true
  },
  { versionKey: false }
);

//MIDDLEWARE
// post : after , pre : before schema model is created . 
blogSchema.pre('save',async function(next){
    const blog = this; // gives a reference to the document before it's save 
    blog.toJSON({virtuals:true})
    if(blog.isModified('description')){
       //console.log("description updatd")
    }
    //console.log('just before saving')
    next() ; // if we next call next we go the to actual flow of our application 
})
//creating the model 
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
