import { createContext, useState } from "react"


export const AppContext=createContext()

const AppContextProvider=(props)=>{

const [showLogin,setShowLogin]=useState(true)


const value={
showLogin,
setShowLogin

}


return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)


}

export default AppContextProvider