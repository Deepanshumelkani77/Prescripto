import { createContext, useState } from "react"
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {doctors} from '../assets/assets'
import { showSuccess, showError } from '../utils/toast'

export const AppContext=createContext()

const AppContextProvider=(props)=>{

// Get initial state from localStorage or default to 'User'
const [state, setState] = useState(() => {
  const savedState = localStorage.getItem('appState');
  return savedState ? savedState : 'User';
})
const [showLogin,setShowLogin]=useState(false)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;



  //store current user in cookie than we use currentuser anywhere
  const userCookie = Cookies.get("user");
const initialUser = userCookie && userCookie !== "undefined" 
  ? JSON.parse(userCookie) 
  : null;

const [user, setUser] = useState(initialUser);


  
  const login = async (email, password) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/user/login`, { email, password });
        console.log("Login response:", response.data);
        Cookies.set("token", response.data.token, { expires: 1 });
        Cookies.set("user", JSON.stringify(response.data.user), { expires: 1 });
        setUser(response.data.user);
        showSuccess('Logged in successfully!');
        return response.data.user;
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed";
        showError(errorMessage);
        throw new Error(errorMessage);
      }
    }
  
    const signup = async (username, email, password) => {
      try {
        await axios.post(`${API_BASE_URL}/user/signup`, { username, email, password });
        showSuccess('Signup successful! Please login.');
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Signup failed";
        showError(errorMessage);
        throw new Error(errorMessage);
      }
    };
  
    const navigate=useNavigate()

    const logout = () => {
      Cookies.remove("token");
      Cookies.remove("user");
      localStorage.removeItem('appState');
      setUser(null);
      setState('User');
      showSuccess('Logged out successfully!');
      navigate('/');
    };
  



const value={


state,
setState: (newState) => {
  setState(newState);
  localStorage.setItem('appState', newState);
},
showLogin,
setShowLogin,
user,
login,
signup,
logout,
doctors
}


return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)


}

export default AppContextProvider