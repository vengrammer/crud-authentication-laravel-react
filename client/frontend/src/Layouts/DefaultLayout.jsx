import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../Views/axiosClient";


function DefaultLayout(){
    const {user, token, notification, setUser, getToken,} = useStateContext();

    useEffect(() => {
            axiosClient.get('/user')
            .then(({data}) => {
                setUser(data);      
            });
        }, []);

    if(!token){
        return <Navigate to='/login'/>
    }
    
    function handleLogout(e){
        e.preventDefault();

        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                getToken(null)
            })
        }

    return(
        <>
        <div className="flex min-h-screen bg-gray-100">         
             <aside className="w-64 bg-[#343333] text-white p-6 space-y-6">
                <h2 className="text-xl font-bold">MyApp</h2>
                <nav className="space-y-3">

                    <Link
                        to="/dashboard"
                        className="block hover:bg-gray-700 rounded px-4 py-2 transition"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/users"
                        className="block hover:bg-gray-700 rounded px-4 py-2 transition"
                    >
                        Users
                    </Link>
                    
                </nav>
            </aside>
             {notification && (
                    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full">
                        <div className="bg-green-700 border border-gray-200 shadow-lg rounded-2xl p-4">
                            <div className="text-white text-sm font-medium">
                                {notification}
                            </div>
                        </div>
                    </div>
                )}
            <div className="flex-1 flex flex-col">
    
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b">

                    <div className="text-xl font-semibold text-gray-800">
                        Header
                    </div>

                    <div className="text-gray-700 text-sm">
                        {user?.name || 'Loading...'}
                        <button className="text-red-600 pl-5" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                    
                </header>


                <main className="flex-1 px-6 py-6 overflow-y-auto">
                    <Outlet />
                </main>

               
            </div>  
        </div>

        </>
    )
}
export default DefaultLayout;