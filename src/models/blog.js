"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const BlogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      default: [],
    },
    isPublish: {
      type: Boolean,
      default: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    likedBy: {
      type: [mongoose.Schema.Types.ObjectId], 
      ref: "User",
      default: [],
    },
    countOfVisitors: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "blogs",
    timestamps: true,
  }
);


//* Like Method
BlogSchema.methods.like = async function (userId) {
    if (!this.likedBy.includes(userId)) {
      
      this.likedBy.push(userId); 
      this.likes += 1; 
      await this.save();
    } else {
      throw new Error("User has already liked this blog");
    }
  };
  
  //* Unlike Method
  BlogSchema.methods.unlike = async function (userId) {
    if (this.likedBy.includes(userId)) {
     
      this.likedBy = this.likedBy.filter((id) => id.toString() !== userId.toString()); 
      if (this.likes > 0) {
        this.likes -= 1; 
      }
      await this.save();
    } else {
      throw new Error("User has not liked this blog yet");
    }
  };
  
  //* Increase Visitors
  BlogSchema.methods.increaseVisitors = async function () {
    this.countOfVisitors = (this.countOfVisitors || 0) + 1; 
  };

module.exports = mongoose.model("Blog", BlogSchema);
