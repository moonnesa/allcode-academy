import { createContext, useEffect, useState, useContext } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // Simulate fetching user data from an API
    setUser({ name: "John Doe", email: "john.doe@example.com" });
  }, []);

  return [ user, setUser ];
};

// Example of how to use the UserContext in a component
/*
import React, { useContext } from "react";
import UserContext from "./UserContext"; */