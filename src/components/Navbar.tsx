import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
            <div className="font-bold text-xl text-indigo-400">URL Shortener</div>
            <div className="flex items-center space-x-4">
                <span className="text-slate-300 text-sm">Hello, <strong className="text-white">{user?.name || user?.email || "User"}</strong></span>
                <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded text-sm transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
