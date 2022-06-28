import apiClient from "./ApiClient";
import { Student } from "./student_model";

const getAllStudents = async () => {
  const res = await apiClient.get("/post/");
  let students = Array<Student>()
  
  if(res.data){
    res.data.forEach((element) => {
      const st:Student ={
        id: element.sender,
        name: element.message
      }
      students.push(st)
    });
  }else {
    console.log("getAllStudents fail");
    
  }
  return students
};
const addStudent = async (std: Student) => {
  const res = await apiClient.post("/post",{
    sender: std.id,
    message: std.name
  });
  if(res.ok){
    console.log("addStudent success");
    
  }else {
    console.log("addStudent fail");
  }};


export default {
  getAllStudents,
  addStudent,
};

