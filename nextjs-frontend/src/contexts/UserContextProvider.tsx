"use client";

import React from "react";

interface User {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  age: number;
  picture: string;
  short_bio: string;
  about: string;
  interests: string;
}

interface IWrapper {
  children: React.ReactNode;
  value: {
    user: User | null;
  };
}

const UserContext = React.createContext<{ user: User | null }>({
  user: null,
});

UserContext.displayName = "UserContext";
export const useUserContext = () => React.useContext(UserContext);

const UserContextProvider = ({ children, value }: IWrapper) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
