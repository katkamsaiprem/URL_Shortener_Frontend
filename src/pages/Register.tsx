import { Navigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useRegisterForm } from "../hooks/useRegisterForm";

const inputClass = (fieldErr: string) =>
    `w-full px-3 py-2 bg-slate-700 rounded border focus:outline-none text-white transition-colors ${
        fieldErr
            ? "border-red-500 focus:border-red-400"
            : "border-slate-600 focus:border-indigo-500"
    }`;

const Register = () => {
    const user = useAuthStore((s) => s.user);
    const { form, handleFieldChange, handleSubmit } = useRegisterForm();
    const { fields, errors, loading } = form;

    if (user) return <Navigate to="/dashboard" replace />;

    return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-indigo-400 text-center">Create Account</h2>

                {errors.server && (
                    <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded text-sm">
                        {errors.server}
                    </div>
                )}

                <div>
                    <label className="block text-sm text-slate-300 mb-1">Username</label>
                    <input
                        id="register-username"
                        type="text"
                        required
                        value={fields.username}
                        onChange={handleFieldChange("username")}
                        className={inputClass(errors.username)}
                        placeholder="johndoe"
                        autoComplete="username"
                    />
                    {errors.username && <p className="mt-1 text-xs text-red-400">{errors.username}</p>}
                </div>

                <div>
                    <label className="block text-sm text-slate-300 mb-1">Email</label>
                    <input
                        id="register-email"
                        type="email"
                        required
                        value={fields.email}
                        onChange={handleFieldChange("email")}
                        className={inputClass(errors.email)}
                        placeholder="you@example.com"
                        autoComplete="email"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm text-slate-300 mb-1">Password</label>
                    <input
                        id="register-password"
                        type="password"
                        required
                        value={fields.password}
                        onChange={handleFieldChange("password")}
                        className={inputClass(errors.password)}
                        placeholder="Min 8 characters"
                        autoComplete="new-password"
                    />
                    {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded font-medium disabled:opacity-50"
                >
                    {loading ? "Creating account..." : "Register"}
                </button>

                <p className="text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-400 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
