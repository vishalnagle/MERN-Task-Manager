import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext();
const BASE_URL = "http://localhost:8000/api";
export const AuthProvider = ({ children }) => {
  const [openDialogSignUp, setOpenDialogSignUp] = useState(false);
  const [dialogMeassage, setdialogMeassage] = useState('')
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    console.log("Login", userData)
    try {
      const response = await fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {

        setUser(data);
        console.log("response data", data.token)
        localStorage.setItem('uqUserId', data.user._id)
        localStorage.setItem('token', data.token)
        window.location.replace('/task')

      } else {
        setOpenDialogSignUp(true)
        setdialogMeassage("Invalid Credentails")
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const register = async (userData) => {
    console.log("USERDATA: ", userData)

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("response data: ", data)
      if (response.ok) {
        window.location.replace('/login')
        console.log("signup success.")
        setUser(data);
      } else {
        setOpenDialogSignUp(true)
        setdialogMeassage("Something went wrong try again")
        console.error("Registration failed:", data.error);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const logout = () => {
    console.log("Lagout")
  };
  const handleCloseSignUp = () => {
    setOpenDialogSignUp(false);
  };


  return (
    <AuthContext.Provider value={{ user, login, register, logout, openDialogSignUp, dialogMeassage, setOpenDialogSignUp, setdialogMeassage, handleCloseSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
