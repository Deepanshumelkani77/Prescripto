import { createContext, useState } from "react"
import axios from "axios";
import Cookies from "js-cookie";


export const AppContext=createContext()

const AppContextProvider=(props)=>{

const [showLogin,setShowLogin]=useState(false)





  //store current user in cookie than we use currentuser anywhere
  const adminCookie = Cookies.get("admin");
const initialUser = adminCookie && adminCookie !== "undefined" 
  ? JSON.parse(adminCookie) 
  : null;

const [user, setUser] = useState(initialUser);

console.log(user)
  
  const login = async (email, password) => {
      try {
        const response = await axios.post("http://localhost:5000/admin/login", { email, password });
        console.log("Login response:", response.data);
        Cookies.set("token", response.data.token, { expires: 1 });
        Cookies.set("admin", JSON.stringify(response.data.admin), { expires: 1 });
        setUser(response.data.admin);
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
    }
  
    const signup = async (name, email, password) => {
      try {
        await axios.post("http://localhost:5000/admin/signup", { name, email, password });
        alert("Signup successful! Please login.");
      } catch (error) {
        alert(error.response?.data?.message || "Signup failed");
      }
    };
  
    const logout = () => {
      Cookies.remove("token");
      Cookies.remove("admin");
      setUser(null);
    };
  



const value={
showLogin,
setShowLogin,
signup,
login,
logout,
user

}


return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)


}

export default AppContextProvider