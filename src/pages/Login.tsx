import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Login = () => {
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
    });

    const login = useAuthStore((s) => s.login);
    const user = useAuthStore((s) => s.user);
    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleChange = (field: "email" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState((prev) => ({ ...prev, error: "", loading: true }));
        try {
            await login(formState.email, formState.password);
            navigate("/dashboard");
        } catch (err: unknown) {
            const message =
                err instanceof Error && (err as { response?: { data?: { message?: string } } }).response?.data?.message;
            setFormState((prev) => ({
                ...prev,
                error: message || "Login failed. Check server/credentials.",
            }));
        } finally {
            setFormState((prev) => ({ ...prev, loading: false }));
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-indigo-400 text-center">Login</h2>
                {formState.error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded text-sm">
                        {formState.error}
                    </div>
                )}
                <div>
                    <label className="block text-sm text-slate-300 mb-1">Email</label>
                    <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange("email")}
                        className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-indigo-500 text-white"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-300 mb-1">Password</label>
                    <input
                        type="password"
                        required
                        value={formState.password}
                        onChange={handleChange("password")}
                        className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-indigo-500 text-white"
                        placeholder="••••••••"
                    />
                </div>
                <button
                    type="submit"
                    disabled={formState.loading}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded font-medium disabled:opacity-50"
                >
                    {formState.loading ? "Logging in..." : "Login"}
                </button>
                <p className="text-center text-sm text-slate-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-indigo-400 hover:underline">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
