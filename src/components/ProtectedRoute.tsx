import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const user = useAuthStore((s) => s.user);
    const isLoading = useAuthStore((s) => s.isLoading);

    // Don't redirect until session check completes
    if (isLoading) return <div>Loading...</div>;

    // Send unauthenticated users back to login
    if (!user) return <Navigate to="/login" replace />;

    return <>{children}</>;
};

export default ProtectedRoute;