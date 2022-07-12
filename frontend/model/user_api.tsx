import apiClient from "./ApiClient";
import { User } from "./user_model";

const getAllUsers = async () => {
  const res = await apiClient.get("/user/");
  let users = Array<User>()
  
  if(res.data){
    res.data.forEach((element) => {
      const user:User ={
        email: element.userName,
        password: element.password,
      }
      users.push(user)
    });
  }else {
    console.log("getAllUser fail");
    
  }
  return users
};
const addUser = async (user: User) => {
  const res = await apiClient.post("/auth/register",{
    email:user.email,
    password:user.password,
    imageUri:user.imageUri
  });
  if(res.ok){
    console.log("addUser success");
    
  }else {
    console.log("addUser fail");
  }};

const loginUser =async (user:User) => {
  const res = await apiClient.post("/auth/login",{
    email:user.email,
    password:user.password
  });
  if(res.ok){
    console.log("Login success");
    
  }else {
    console.log("Login fail");
  }
}

const uploadImage = async (imageUri:String)=> {
  console.log("uploadImage")
  const formData = new FormData()
  formData.append('file',{name: 'name', type:'image/jpeg', uri: imageUri})
  let url = '/file/profile_file'
  const res = await apiClient.post(url,formData)
  if (res.ok){
      console.log("upload Image passed " + res.data)
      return res.data.url
  }else{
      console.log("save failed " + res.problem)
  }
}
export default {
  getAllUsers,
  addUser,
  loginUser,
  uploadImage,
};

