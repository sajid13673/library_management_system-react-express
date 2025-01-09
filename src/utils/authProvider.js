import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useReducer((prev, cur) => {
    localStorage.setItem("userData", JSON.stringify(cur));
    return cur;
  }, JSON.parse(localStorage.getItem("userData")));

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token.token;
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }

    return () => {
      delete axios.defaults.headers.common["Authorization"];
    };
  }, [token]);

  const contextValue = useMemo(() => ({
    token,
    setToken,
  }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
