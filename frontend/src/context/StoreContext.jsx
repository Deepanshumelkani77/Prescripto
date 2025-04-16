import { createContext, useState } from "react"
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export const StoreContext=createContext()

const StoreContextProvider=(props)=>{


const [showLogin2,setShowLogin2]=useState(true)





  //store current user in cookie than we use currentuser anywhere
  const doctorCookie = Cookies.get("doctor");
const initialUser = doctorCookie && doctorCookie !== "undefined" 
  ? JSON.parse(doctorCookie) 
  : null;

const [doctor, setDoctor] = useState(initialUser);

console.log(doctor)
  
  const login = async (email, password) => {
      try {
        const response = await axios.post("http://localhost:5000/doctorLogin/login", { email, password });
        console.log("Login response:", response.data);
        Cookies.set("token", response.data.token, { expires: 1 });
        Cookies.set("doctor", JSON.stringify(response.data.doctor), { expires: 1 });
        setDoctor(response.data.doctor);
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
    }
  
    const signup = async (username, email, password) => {
      try {
        await axios.post("http://localhost:5000/doctorLogin/signup", { username, email, password });
        alert("Signup successful! Please login.");
      } catch (error) {
        alert(error.response?.data?.message || "Signup failed");
      }
    };
  
    const navigate=useNavigate()

    const logout = () => {
      Cookies.remove("token");
      Cookies.remove("doctor");
      
      setUser(null);
     
    };
  



const value={



showLogin2,
setShowLogin2,
doctor,
login,
signup,
logout
}


return(
    <StoreContext.Provider value={value}>
        {props.children}
    </StoreContext.Provider>
)


}

export default StoreContextProvider