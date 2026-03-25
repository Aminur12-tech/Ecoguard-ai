

export default function Landing(){
    const handleRegister = () => {
        window.location.href = '/register';
    }

    const handleLogin = () => {
        window.location.href = '/login';
    }

    return(
        <div>
            <h1>Welcome to the Landing Page</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRegister}>
                Register
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>
                Login
            </button>
        </div>
    )
}