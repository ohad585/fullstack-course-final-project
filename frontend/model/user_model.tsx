import UserApi from "./user_api"


export type User = {
  email: String;
  password: String;
};



const getAllUsers = async () => {
  const users = await UserApi.getAllUsers()
  return users
};
const addUser = async (user: User) => {
  
  await UserApi.addUser(user)
};
const loginUser =async (user:User) => {
  console.log("user_model loginUser "+user.email + " "+ user.password);
  
  await UserApi.loginUser(user)
}
export default {
  getAllUsers,
  addUser,
  loginUser,
};
