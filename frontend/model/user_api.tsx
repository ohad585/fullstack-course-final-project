import apiClient from "./ApiClient";
import { User } from "./user_model";

const getAllUsers = async () => {
  const res = await apiClient.get("/user/");
  let users = Array<User>()
  
  if(res.data){
    res.data.forEach((element) => {
      const user:User ={
        user_name: element.userName,
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
  const res = await apiClient.post("/user",{
    user_name:user.user_name,
    password:user.password
  });
  if(res.ok){
    console.log("addUser success");
    
  }else {
    console.log("addUser fail");
  }};


export default {
  getAllUsers,
  addUser,
};

