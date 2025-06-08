import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"
import axiosClient from "./axiosClient"


function UserForm(){
    const {id} = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    
    useEffect(() =>{
        if(id){   
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({data}) =>{
                    setLoading(false)
                    setUser(data)
                })
                .catch((errors) =>{
                    setLoading(false)
                    setErrors(errors)
                })
        }
    }, [id])
    function onsubmit(e){
        e.preventDefault()
        console.log(user)
        if(user.id){
            axiosClient.put(`/users/${user.id}`, user)
            .then(()=>{
                navigate('/users')
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422){
                    setErrors(response.data.errors)
                }
            })
        }else{
            axiosClient.post(`/users`, user)
            .then(()=>{
                navigate('/users')
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422){
                    setErrors(response.data.errors)
                }
            })
        }
    }
    return(
    <>
        {user.id ? (
            <h1 className="text-2xl font-semibold mb-4">Update User: {user.name}</h1>
        ) : (
            <h1 className="text-2xl font-semibold mb-4">New User</h1>
        )}

        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            {loading && <div className="text-center text-gray-500 mb-4">Loading...</div>}

            {errors && (
            <div className="bg-red-500 rounded p-3 mb-4">
                {Object.keys(errors).map((key) => (
                <p className="text-white pl-2 text-sm" key={key}>
                    {errors[key][0]}
                </p>
                ))}
            </div>
            )}

            {!loading && (
            <form onSubmit={onsubmit} className="space-y-4">
                <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="password"
                onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                Save
                </button>
            </form>
            )}
        </div>
    </>

    )
}

export default UserForm;