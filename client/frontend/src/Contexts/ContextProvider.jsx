import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    user: null,
    token: null, 
    notification: null,  
    setUser: () =>{},
    getToken: () =>{},
    setNotification: () => {},
})

function ContextProvider({children}){
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState('');
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    function setNotification(message){
        _setNotification(message);
        setTimeout(()=>{
            _setNotification('')
        }, 5000)
    }

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
        getToken,
        notification,
        setNotification
    }}>
        {children}
    </StateContext.Provider>
   ) 
}
export default ContextProvider;
export const useStateContext = () => useContext(StateContext);