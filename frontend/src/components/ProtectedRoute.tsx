import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children} : { children: React.ReactNode}) =>{
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if(!token){
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;