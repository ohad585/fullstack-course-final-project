import apiClient from "./ApiClient";
import { Post } from "./post_model";

const getAllPosts = async (accessToken:String) => {
  const res = await apiClient.setHeader("authorization",accessToken.toString()).get("/post/");
  let posts = Array<Post>()
  
  if(res.data){
    res.data.forEach((element) => {
      const p:Post ={
        id: element.sender,
        name: element.message,
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
const addPost = async (p: Post,accessToken:String) => {
  console.log("Token on add post API "+accessToken);
  apiClient.addAsyncRequestTransform(request =>async () => {
    request.headers['authorization'] = "barer " + accessToken
  })
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


  const uploadImage = async (imageUri:String,accessToken:String)=> {
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

export default {
  getAllPosts,
  addPost,
  uploadImage,
};

