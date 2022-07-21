import UserApi from "./user_api"


export type User = {
  email: String;
  password: String;
  imageUri: String;
};



const getAllUsers = async () => {
  const users = await UserApi.getAllUsers()
  return users
};
const addUser = async (user: User) => {
  await UserApi.addUser(user)
};

const updateUser = async (user: User) => {
  await UserApi.updateUser(user)
};


const loginUser =async (user:User) => {
  console.log("user_model loginUser "+user.email + " "+ user.password);
  
  await UserApi.loginUser(user)
}
const uploadImage =async (imageUri:String) => {
  console.log("User upload image ")
  return UserApi.uploadImage(imageUri)
}

export default {
  getAllUsers,
  addUser,
  loginUser,
  uploadImage,
  updateUser
};
