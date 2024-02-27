"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserInfo {
  // Update this interface to match the structure of your userinfo object
  [key: string]: any;
}

interface AppContextProps {
  userName: string;
  theme: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  toggleTheme: () => void;
  userinfo: UserInfo;
  setUserinfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const AppContext = createContext<AppContextProps>({
  userName: "",
  theme: "light",
  setUsername: () => "",
  toggleTheme: () => {},
  userinfo: {},
  setUserinfo: () => {},
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUsername] = useState<string>("");
  const [theme, setTheme] = useState<string>("light");
  const [userinfo, setUserinfo] = useState<UserInfo>({});
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const value = {
    userName,
    theme,
    setUsername,
    toggleTheme,
    userinfo,
    setUserinfo
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Export the context
export const useAppContext = (): AppContextProps => useContext(AppContext);