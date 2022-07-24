import PostApi from "./post_api"


export type Post = {
  id: String;
  name: String;
  text: String;
  imageUrl: String;
};



const getAllPosts = async (accessToken:String) => {
  const posts = await PostApi.getAllPosts(accessToken)
  return posts
};
const addPost = async (p: Post,accessToken:String) => {
  
  return await PostApi.addPost(p,accessToken)
};

const uploadImage = async (imageUri:String,accessToken:String)=> {
  const url = await PostApi.uploadImage(imageUri,accessToken)
  return url
}

export default {
  getAllPosts,
  addPost,
  uploadImage
};
