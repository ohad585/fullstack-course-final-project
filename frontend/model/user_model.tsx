import UserApi from "./user_api"


export type User = {
  user_name: String;
  password: String;
};



const getAllUsers = async () => {
  const users = await UserApi.getAllUsers()
  return users
};
const addUser = async (user: User) => {
  
  await UserApi.addUser(user)
};

export default {
  getAllUsers,
  addUser,
};
