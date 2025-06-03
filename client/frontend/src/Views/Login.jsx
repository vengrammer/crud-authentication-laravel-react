
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "./axiosClient";
import { useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider";

function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser, getToken} = useStateContext();
    
     function onSubmit(e){
        e.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            }
        axiosClient.post('/login', payload)
            .then(({data}) => {
            setUser(data.user)
            getToken(data.token);
        })
        .catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                setErrors(response.data.error)
            }
        }) 
    }

    return(
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
                <form onSubmit={onSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

                {errors && 
                    <div className="bg-red-500 rounded p-2">
                        <p className="text-white p-2">{errors}</p>
                    </div>
                }

                <input
                    type="email"
                    placeholder="Email"
                    required
                    ref={emailRef}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    ref={passwordRef}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    Login
                </button>
                </form>
                <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Create an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                    Signup
                    </Link>
                </p>
                </div>
            </div>
        </div>


        </>
    )
}

export default Login;