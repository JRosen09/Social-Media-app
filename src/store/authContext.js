import { useState, useEffect, useCallback, createContext } from "react";

//will use this to keep track of how long the auth token has before it expires
let logoutTimer;

//creates a default 'context' object, which is where we'll store global state values
const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null,
});

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime();
  const expTime = exp;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("exp");
  const storeduserId = localStorage.getItem("userId");

  const remainingTime = calculateRemainingTime(storedExp);

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userId: storeduserId,
  };
};

export const AuthContextProvider = (props) => {
  const localData = getLocalData();

  let initialToken;
  if (localData) {
    initialToken = localData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(null);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("userId");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  //stores the user info in cotext
  const login = (token, exp, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("exp", exp);
    localStorage.setItem("userId", userId);

    const remainingTime = calculateRemainingTime(exp);

    logoutTimer = setTimeout(logout, remainingTime);
  };

  const contextValue = {
    token,
    login,
    logout,
    userId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
