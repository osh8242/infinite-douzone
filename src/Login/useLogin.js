import { useState } from "react";
import { loginUser } from "./loginUser";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (userId, userPwd) => {
    setLoading(true);
    const { data, error } = await loginUser(userId, userPwd);
    setLoading(false);

    if (error) {
      setError(error);
      return false;
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("userInfo", JSON.stringify(data.user));
    return true;
  };

  return { handleLogin, loading, error };
};
