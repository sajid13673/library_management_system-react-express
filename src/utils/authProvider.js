import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import api, { setAccessToken } from "../Services/api";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setToken = (newToken) => {
    const accessToken =
      typeof newToken === "string"
        ? newToken
        : newToken?.access_token ?? null;

    setAccessToken(accessToken);
    setTokenState(accessToken);

    if (newToken?.user) {
      setUser(newToken.user);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('initialize auth');
        
        // The browser sends the HttpOnly refresh-token cookie.
        const response = await api.post("/refresh-token");
        console.log('auth prov res',response);
        

        if (!mounted) return;

        const accessToken = response.data.access_token;

        setAccessToken(accessToken);
        setTokenState(accessToken);
        setUser(response.data.user ?? null);
      } catch (error) {
        if (!mounted) return;

        setAccessToken(null);
        setTokenState(null);
        setUser(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setAccessToken(null);
      setTokenState(null);
      setUser(null);
    }
  };

  const contextValue = useMemo(
    () => ({
      token,
      user,
      loading,
      setToken,
      setUser,
      logout,
    }),
    [token, user, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;