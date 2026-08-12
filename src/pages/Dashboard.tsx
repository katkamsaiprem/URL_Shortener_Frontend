import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useUrlStore } from "../store/urlStore";
import UrlTable from "../components/UrlTable";
import CreateUrlModal from "../components/CreateUrlModal";
import StatsOverview from "../components/StatsOverview";


const Dashboard = () => {
    const { urls, isLoading, error, loadUrls } = useUrlStore();
    const [showCreate, setShowCreate] = useState(false);

    // Load URLs when dashboard first mounts
    useEffect(() => {
        loadUrls();
    }, [loadUrls]);

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Navbar />

            <main className="p-8 max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-indigo-400">My URLs</h1>
                        <p className="text-slate-400 mt-1 text-sm">Manage and track your shortened links</p>
                    </div>
                    <button
                        id="open-create-modal"
                        onClick={() => setShowCreate(true)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded font-medium transition shadow-lg shadow-indigo-600/20"
                    >
                        + Shorten URL
                    </button>
                </div>

                {isLoading && (
                    <div className="flex items-center justify-center p-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
                        {error}
                    </div>
                )}

                {!isLoading && !error && (
                    <div className="space-y-6">
                        <StatsOverview urls={urls} />
                        <UrlTable urls={urls} />
                    </div>
                )}
            </main>

            {showCreate && <CreateUrlModal onClose={() => setShowCreate(false)} />}
        </div>
    );
};

export default Dashboard;
