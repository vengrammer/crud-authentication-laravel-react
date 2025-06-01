
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "./axiosClient"
import { useStateContext } from "../Contexts/ContextProvider";
import { useState } from "react";

function Signup(){
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordconfirmationRef = useRef();
    const [errors, setErrors] = useState(null);

    const {setUser, getToken} = useStateContext()
    
    function onSubmit(e){
        e.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordconfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
            .then(({data}) => {
            setUser(data.user)
            getToken(data.token);
        })
        .catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                setErrors(response.data.errors)
            }
        }) 
    }
    return(
        <>
         <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
                <form onSubmit={onSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-700">Signup</h2>
                {errors && 
                    <div className="bg-red-500 rounded p-2">
                        {Object.keys(errors).map(key => (
                            <p className="text-white pl-5"  key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                <input
                    type="text"
                    placeholder="Fullname"
                    ref={nameRef}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    ref={emailRef}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    ref={passwordconfirmationRef}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    Signup
                </button>
                </form>
                <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Already have an acount?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                    Login
                    </Link>
                </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup;