"use strict";

const Blog = require("../models/blog");
const Category = require("../models/category");
const User = require("../models/user");
const Comment = require("../models/comment"); 


const usersData = [
  { username: "user1", email: "user1@test.com", password: "Password123!" },
  { username: "user2", email: "user2@test.com", password: "Password123!" },
  { username: "user3", email: "user3@test.com", password: "Password123!" },
];

const categories = [
    "World",
    "Technology",
    "Design",
    "Culture",
    "Business",
    "Politics",
    "Science",
    "Health",
    "Style",
    "Travel", ];

    const categoryImages = {
        World: "https://cdn.pixabay.com/photo/2015/01/27/09/58/landscape-612751_1280.jpg",
        Technology: "https://cdn.pixabay.com/photo/2014/08/26/21/48/tablet-428019_1280.jpg",
        Design: "https://cdn.pixabay.com/photo/2016/11/22/19/08/design-1853158_1280.jpg",
        Culture: "https://cdn.pixabay.com/photo/2016/03/26/13/09/person-1281601_1280.jpg",
        Business: "https://cdn.pixabay.com/photo/2016/11/19/14/00/business-1839876_1280.jpg",
        Politics: "https://cdn.pixabay.com/photo/2015/11/07/11/16/ballot-1032697_1280.jpg",
        Science: "https://cdn.pixabay.com/photo/2017/08/10/03/03/chemistry-2619826_1280.jpg",
        Health: "https://cdn.pixabay.com/photo/2017/08/10/03/03/chemistry-2619826_1280.jpg",
        Style: "https://cdn.pixabay.com/photo/2015/11/19/20/29/fashion-1053873_1280.jpg",
        Travel: "https://cdn.pixabay.com/photo/2015/10/12/15/07/airplane-984645_1280.jpg",
      };

const sampleComments = [
  "Great article!",
  "I completely agree with this.",
  "This was very insightful, thank you!",
];


const getRandomDate = () => {
  const today = new Date();
  const randomYear = Math.floor(Math.random() * (today.getFullYear() - 2010 + 1)) + 2010;
  const randomMonth = Math.floor(Math.random() * 12);
  const randomDay = Math.floor(Math.random() * 28) + 1;
  return new Date(randomYear, randomMonth, randomDay);
};

module.exports = async () => {
  
  await User.deleteMany().then(() => console.log(" - User Deleted All"));
  await Category.deleteMany().then(() =>
    console.log(" - Category Deleted All"),
  );
  await Blog.deleteMany().then(() =>
    console.log(" - Blog Deleted All"),
  );
  await Comment.deleteMany().then(() =>
    console.log(" - Comment Deleted All"));

  

  //* User Create
  const users = await User.create(usersData);
  

  //* Category Create
  const categoryDocs = await Category.create(
    categories.map((name) => ({ name }))
  );
  

  //* Blogs Create
  const blogs = [];
  for (let i = 0; i < 15; i++) {
    const category = categoryDocs[i % categoryDocs.length]; 
    const blog = await Blog.create({
      userId: users[i % users.length]._id, 
      categoryId: category._id, 
      title: `Sample "${category.name}" Post - Blog ${i + 1}`, 
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      isPublished: Boolean(i % 2), 
      createdAt: getRandomDate(),
      image: categoryImages[category.name], 
    });
    blogs.push(blog);
  }
  

  //* Comment for Blogs
  for (const blog of blogs) {
    const comments = sampleComments.map((text, idx) => ({
      blogId: blog._id,
      userId: users[idx % 3]._id, 
      content: text,
      createdAt: getRandomDate(),
    }));
    await Comment.create(comments);
  }

  
  console.log("* Synchronized  *");
};