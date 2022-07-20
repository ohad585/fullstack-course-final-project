import apiClient from "./ApiClient";
import { User, UserCredentials } from "./user_model";

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
    
    const usrC:UserCredentials = {
      access_token:res.data.access_token,
      refresh_token:res.data.refresh_token,
      _id:res.data._id
    }
    console.log("addUser success "+usrC._id);
    return usrC
    
  }else {
    console.log("addUser fail");
    return null
  }};

  const addGoogleUser = async (usr: User) => {
    console.log("Add google user attempt "+ usr.email);
    
    const res = await apiClient.post("/auth/register/google",{
      email:usr.email,
      password:usr.password,
      imageUri:usr.imageUri
    });
    if(res.ok){
      console.log(res.data)
      const usrC:UserCredentials = {
        access_token:res.data.access_token,
        refresh_token:res.data.refresh_token,
        _id:res.data._id
      }
      console.log("addGoogleUser success "+usrC._id);

      return usrC
      
    }else {
      console.log("addGoogleUser fail");
    }};

const loginUser =async (user:User) => {
  const res = await apiClient.post("/auth/login",{
    email:user.email,
    password:user.password
  });
  if(res.ok){
    console.log(res.data)
    const usrC:UserCredentials = {
      access_token:res.data.access_token,
      refresh_token:res.data.refresh_token,
      _id:res.data._id
    }
    console.log("Login success "+usrC._id);
    return usrC
  }else {
    console.log("Login fail");
    return null
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
      return null
  }
}
export default {
  getAllUsers,
  addUser,
  loginUser,
  uploadImage,
  addGoogleUser,
};

