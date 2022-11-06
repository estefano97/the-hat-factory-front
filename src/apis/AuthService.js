import axios from "axios";

export const LoginAuth = async (request) => {
  try{
    let response = await axios.post(
        "https://localhost:44345/api/auth/login",request);
      console.log(response.data);
      return response.data;
      
  } catch(ex) {
    console.error(ex);
  }
};
