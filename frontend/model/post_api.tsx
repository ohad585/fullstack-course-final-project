import apiClient from "./ApiClient";
import { Post } from "./post_model";

const getAllPosts = async () => {
  const res = await apiClient.get("/post/");
  let posts = Array<Post>()
  
  if(res.data){
    res.data.forEach((element) => {
      const p:Post ={
        id: element.sender,
        name: element.message,
        text: element.text
      }
      posts.push(p)
    });
  }else {
    console.log("getAllPosts fail");
    
  }
  return posts
};
const addPost = async (p: Post) => {
  const res = await apiClient.post("/post",{
    sender: p.id,
    message: p.name,
    text: p.text
  });
  if(res.ok){
    console.log("addPost success");
    
  }else {
    console.log("addPost fail");
  }};


export default {
  getAllPosts,
  addPost,
};

