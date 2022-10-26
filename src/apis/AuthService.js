import helpHttp from "../helpers/helpHttp";

export const LoginAuth = async (request) => {
  try{
    let response = await helpHttp().post(
        "https://kaal1.000webhostapp.com/API/loginUser",
        {
          body: request,
          Headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      return response;
      
  } catch(ex) {
    console.error(ex);
  }
};
