import { createContext, useState } from "react"
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from '../utils/toast';

export const StoreContext=createContext()

const StoreContextProvider=(props)=>{
  const [showLogin2,setShowLogin2]=useState(false)

  //store current user in cookie than we use currentuser anywhere
  const doctorCookie = Cookies.get("doctor");
  const initialUser = doctorCookie && doctorCookie !== "undefined" 
    ? JSON.parse(doctorCookie) 
    : null;

  const [doctor, setDoctor] = useState(initialUser);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/doctor/login", { email, password });
      console.log("Login response:", response.data);
      Cookies.set("token", response.data.token, { expires: 1 });
      Cookies.set("doctor", JSON.stringify(response.data.doctor), { expires: 1 });
      setDoctor(response.data.doctor);
      showSuccess('Login successful! Welcome back.');
      return response.data.doctor;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      showError(errorMessage);
      throw new Error(errorMessage);
    }
  }

  const signup = async (name, email, password) => {
    try {
      await axios.post("http://localhost:5000/doctor/signup", {name, email, password });
      showSuccess("Signup successful! Please login.");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      showError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const navigate=useNavigate()

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("doctor");
    setDoctor(null);
    showSuccess('Logged out successfully!');
    navigate("/");
  };

  const value = {
    showLogin2,
    setShowLogin2,
    doctor,
    login,
    signup,
    logout
  };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider