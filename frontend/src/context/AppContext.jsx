import { createContext, useState } from "react"
import { doctors } from "../assets/assets"

export const AppContext=createContext()

const AppContextProvider=(props)=>{

const [state,setState]=useState('User')


const value={

doctors,
state,
setState
}


return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)


}

export default AppContextProvider