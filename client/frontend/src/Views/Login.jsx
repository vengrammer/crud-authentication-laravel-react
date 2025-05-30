
import { Link } from "react-router-dom";
function Login(){
    return(
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
                <form action="" className="space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
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