import { createContext, useEffect, useState } from "react";
import { User } from "../models/User";
import { api } from "../api/axios";

interface AuthContextData {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const signIn = async (username: string, password: string) => {
    const response = await api.post("/api/token/", { username, password });
    if (response.status === 200) {
      setUser({
        username: response.data.user.username,
        first_name: response.data.user.first_name,
        last_name: response.data.user.last_name,
        email: response.data.user.email,
        date_joined: new Date(response.data.user.date_joined),
        is_active: response.data.user.is_active,
        is_staff: response.data.user.is_staff,
        access_token: response.data.access,
        refresh_token: response.data.refresh,
      });
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        signOut,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
