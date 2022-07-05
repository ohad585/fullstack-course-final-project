import PostApi from "./post_api"


export type Post = {
  id: String;
  name: String;
  text: String;
};



const getAllPosts = async () => {
  const posts = await PostApi.getAllPosts()
  return posts
};
const addPost = async (p: Post) => {
  
  await PostApi.addPost(p)
};

export default {
  getAllPosts,
  addPost,
};
