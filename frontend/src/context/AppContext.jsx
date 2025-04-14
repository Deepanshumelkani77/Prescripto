import { createContext, useState } from "react"
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {doctors} from '../assets/assets'

export const AppContext=createContext()

const AppContextProvider=(props)=>{

const [state,setState]=useState('Doctor')
const [showLogin,setShowLogin]=useState(false)





  //store current user in cookie than we use currentuser anywhere
  const userCookie = Cookies.get("user");
const initialUser = userCookie && userCookie !== "undefined" 
  ? JSON.parse(userCookie) 
  : null;

const [user, setUser] = useState(initialUser);

console.log(user)
  
  const login = async (email, password) => {
      try {
        const response = await axios.post("http://localhost:5000/user/login", { email, password });
        console.log("Login response:", response.data);
        Cookies.set("token", response.data.token, { expires: 1 });
        Cookies.set("user", JSON.stringify(response.data.user), { expires: 1 });
        setUser(response.data.user);
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
    }
  
    const signup = async (username, email, password) => {
      try {
        await axios.post("http://localhost:5000/user/signup", { username, email, password });
        alert("Signup successful! Please login.");
      } catch (error) {
        alert(error.response?.data?.message || "Signup failed");
      }
    };
  
    const navigate=useNavigate()

    const logout = () => {
      Cookies.remove("token");
      Cookies.remove("user");
      setUser(null);
      navigate('/')
    };
  



const value={


state,
setState,
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