import axios from "axios";
import { useLogin } from "./LoginContext";

const useLoginModel = () => {
  const url = "http://localhost:8888";
  const { values } = useLogin();

  const sendDataToBackend = async () => {
    console.log(values);
    try {
      const response = await axios.post(url + "/user/login", values);
      return response.data;
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  return {
    sendDataToBackend,
  };
};

export default useLoginModel;
