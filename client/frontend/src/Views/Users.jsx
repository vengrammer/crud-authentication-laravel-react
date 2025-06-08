
import { useEffect, useState } from "react";
import axiosClient from "./axiosClient"
import {Link} from "react-router-dom"



function Users(){
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        getUsers();
    }, [])

    function getUsers(){
        setLoading(true)
        axiosClient.get('/users')
        .then(({data}) => {
            setUsers(data.data)
            setLoading(false)
            
        })
        .catch(() =>{
            setLoading(false);
        })      
    }

    function handleDelete(u){
        	if(!window.confirm("Are you sure you want to delete this user?")){
                return
            }
            axiosClient.delete(`/users/${u.id}`)
            .then(() =>{
                getUsers()
        })
    }

    return(
        <>
            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-300 text-gray-700">
                    <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Create Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                </thead>
                {loading && <tbody>
                    <tr>
                        <td colSpan="5" className="text-center">
                            Loading...
                        </td>
                    </tr>
                </tbody>}

                {!loading && <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-2 text-sm text-gray-800">{u.id}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{u.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{u.email}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{u.created_at}</td>
                        <td className="px-4 py-2 space-x-2">
                        <Link
                            to={`/users/${u.id}`}
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1 rounded"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(u)}
                            className="inline-block bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>}
            </table>

        </>
    )
}

export default Users;