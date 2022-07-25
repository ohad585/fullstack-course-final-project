import PostApi from "./post_api"
import { UserCredentials } from "./user_model";


export type Post = {
  id: String;
  text: String;
  imageUrl: String;
};

const getUserPosts=async(UserID:String)=>{
  const posts= await PostApi.getUserPosts(UserID)
  return posts
};


const getAllPosts = async () => {
  const posts = await PostApi.getAllPosts()
  return posts
};

const addPost = async (p: Post,userC:UserCredentials) => {
  
  return await PostApi.addPost(p,userC)
};

const uploadImage = async (imageUri:String,userC:UserCredentials)=> {
  const url = await PostApi.uploadImage(imageUri,userC)
  return url
}
const updatePost = async (post: Post) => {
  await PostApi.updatePost(post.id)
};

const removePost = async (postID: String) => {
  await PostApi.removePost(postID)
};

export default {
  getAllPosts,
  addPost,
  uploadImage,
  getUserPosts,
  updatePost,
  removePost
};
