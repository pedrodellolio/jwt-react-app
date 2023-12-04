import { api } from "../api/axios";
import { useAuth } from "./useAuth";

function useRefreshToken() {
  const { setUser } = useAuth();

  const refresh = async (token: string) => {
    const response = await api.post(
      "/api/token/refresh/",
      { refresh: token }
      //   {
      //     withCredentials: true,
      //   }
    );
    setUser((prev) => {
      if (prev) {
        console.log(prev);
        console.log(response.data.access);
        return { ...prev, access_token: response.data.access };
      }
      return null;
    });

    return response.data.access;
  };

  return refresh;
}

export default useRefreshToken;
