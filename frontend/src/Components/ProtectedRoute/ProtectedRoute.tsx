import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const token = localStorage.getItem("token");

    const isAuthenticated = !!token;

    return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
