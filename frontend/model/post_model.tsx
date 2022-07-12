import PostApi from "./post_api"


export type Post = {
  id: String;
  name: String;
  text: String;
  imageUrl: String;
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

export default {
  getAllPosts,
  addPost,
  uploadImage
};
