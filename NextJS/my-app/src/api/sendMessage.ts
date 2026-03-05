import axios from "axios";
import { Message } from "../types/user";
export const sendMessage = async (data: Message) => {
  try {
    const res = await axios.post("http://localhost:5000/message", data);
    return res.data;
  } catch (error: any) {
    console.log(error.response?.data || error.message);
    throw error;
  }
};


export const getAllMessage = async () => {
  try {
    const res = await axios.get('http://localhost:5000/message');
    return res.data
  } catch (error) {
    throw error
  }
}