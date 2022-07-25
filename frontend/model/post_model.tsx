import PostApi from "./post_api"


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

const addPost = async (p: Post,accessToken:String) => {
  
  return await PostApi.addPost(p,accessToken)
};

const uploadImage = async (imageUri:String,accessToken:String)=> {
  const url = await PostApi.uploadImage(imageUri,accessToken)
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
