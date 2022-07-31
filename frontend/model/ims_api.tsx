import apiClient from "./ApiClient";
import { Message } from "./ims_model";

const getAllMessages = async () => {
    const res = await apiClient.get("/msg/");
    let messages = Array<Message>()
    
    if(res.data){
      res.data.forEach((element) => {
        const msg:Message ={
          sender:element.sender,
          text:element.text
        }
        messages.push(msg)
      });
    }else {
      console.log("getAllUser fail");
      
    }
    return messages
  };

  const addMessage = async (msg: Message) => {
    const res = await apiClient.post("/msg/",{
      sender:msg.sender,
      text:msg.text
    });
    if(res.ok){
    
      console.log("Added message");
      
    }else {
      console.log("addMessage fail");
      return null
    }};
  
  export default {addMessage,getAllMessages}