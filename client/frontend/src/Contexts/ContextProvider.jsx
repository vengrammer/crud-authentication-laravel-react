import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () =>{},
    getToken: () =>{}
})

function ContextProvider({children}){
    const [user, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    function getToken(token) {
        setToken(token);
        if(token){
            localStorage.setItem("ACCESS_TOKEN", token)
        }else{
            localStorage.removeItem("ACCESS_TOKEN")
        }
    }
   return( 
    <StateContext.Provider value={{
        user,
        token,
        setUser,
        getToken
    }}>
        {children}
    </StateContext.Provider>
   ) 
}
export default ContextProvider;
export const useStateContext = () => useContext(StateContext);