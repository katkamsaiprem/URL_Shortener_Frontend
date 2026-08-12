import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";

const Dashboard = () => {
    const user = useAuthStore((s) => s.user);

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Navbar />
            <main className="p-8 max-w-4xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold text-indigo-400">Dashboard</h1>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-2">
                    <h2 className="text-xl font-semibold">User Session Active</h2>
                    <p className="text-slate-300"><strong>User ID:</strong> {user?.id}</p>
                    <p className="text-slate-300"><strong>Email:</strong> {user?.email}</p>
                    <p className="text-slate-300"><strong>Name:</strong> {user?.name}</p>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
