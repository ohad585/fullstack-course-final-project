import StudentApi from "./student_api"


export type Student = {
  id: String;
  name: String;
};



const getAllStudent = async () => {
  const students = await StudentApi.getAllStudents()
  return students
};
const addStudent = async (std: Student) => {
  
  await StudentApi.addStudent(std)
};

export default {
  getAllStudent,
  addStudent,
};
