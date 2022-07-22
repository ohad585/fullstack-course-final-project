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
const addPost = async (p: Post) => {
  await PostApi.addPost(p)
};

const uploadImage = async (imageUri:String)=> {
  const url = await PostApi.uploadImage(imageUri)
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
