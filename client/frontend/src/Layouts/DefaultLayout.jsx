import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import { Link } from "react-router-dom";

function DefaultLayout(){
    const {user, token} = useStateContext();
    if(!token){
        return <Navigate to='/login'/>
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
            <div className="flex-1 flex flex-col">
    
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b">

                    <div className="text-xl font-semibold text-gray-800">
                        Header
                    </div>

                    <div className="text-gray-700 text-sm">
                        User info
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