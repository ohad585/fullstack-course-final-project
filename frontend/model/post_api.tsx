import apiClient from "./ApiClient";
import { Post } from "./post_model";
import { User } from "./user_model";



const getUserPosts=async(userID: String)=>{
  const res = await apiClient.get("/post/");
  let posts = Array<Post>()
  if(res.data.id===userID){
    res.data.forEach((element) => {
      const p:Post ={
        id: element.sender,
        text: element.text,
        imageUrl: element.imageUri
      }
      posts.push(p)
    });
  }else {
    console.log("getUserPosts fail");
    
  }
  return posts
};


const getAllPosts = async () => {
  const res = await apiClient.get("/post/");
  let posts = Array<Post>()
  
  if(res.data){
    res.data.forEach((element) => {
      const p:Post ={
        id: element.sender,
        text: element.text,
        imageUrl: element.imageUri
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
    text: p.text,
   imageUrl: p.imageUrl

  });
  if(res.ok){
    console.log("addPost success");
    
  }else {
    console.log("addPost fail");
  }};


  const uploadImage = async (imageUri:String)=> {
    console.log("uploadImage")
    const formData = new FormData()
    formData.append('file',{name: 'name', type:'image/jpeg', uri: imageUri})
    let url = '/file/post_file'
    const res = await apiClient.post(url,formData)
    if (res.ok){
        console.log("upload Image passed " + res.data)
        return res.data.url
    }else{
        console.log("save failed " + res.problem)
    }
}
const updatePost = async (postID: String) => {
  const post = await apiClient.get("/post/:"+postID,{}); 
  const res = await apiClient.post("/post/edit",{
      id:post.data.id,
      text:post.data.text,
      imageUri:post.data.imageUri
    });   
    if(res.ok){
      console.log("update Post success");
      
    }else {
      console.log("update Post fail");
  }};


const removePost=async (postID: String) =>{
  const res = await apiClient.delete("/post/:"+postID,{});   
  if(res.ok){
    console.log("remove Post success");
    
  }else {
    console.log("remove Post fail");
}};




export default {
  getAllPosts,
  addPost,
  uploadImage,
  getUserPosts,
  updatePost,
  removePost
};

