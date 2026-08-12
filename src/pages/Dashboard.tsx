import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useUrlStore } from "../store/urlStore";
import UrlTable from "../components/UrlTable";
import CreateUrlModal from "../components/CreateUrlModal";
import StatsOverview from "../components/StatsOverview";
import UrlFilterBar from "../components/UrlFilterBar";
import type { UrlStatusFilter } from "../types/url";

const Dashboard = () => {
    const { urls, allUrls, isLoading, error, loadUrls } = useUrlStore();
    const [showCreate, setShowCreate] = useState(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<UrlStatusFilter>("all");

    // Fetch filtered URLs from PostgreSQL backend whenever search or status changes (debounced search)
    useEffect(() => {
        const timer = setTimeout(() => {
            loadUrls({
                search: search.trim() ? search.trim() : undefined,
                status: status !== "all" ? status : undefined,
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [search, status, loadUrls]);

    const handleResetFilters = () => {
        setSearch("");
        setStatus("all");
    };

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

                <StatsOverview urls={allUrls} />

                {/* Filter & Search Bar */}
                <UrlFilterBar
                    search={search}
                    onSearchChange={setSearch}
                    status={status}
                    onStatusChange={setStatus}
                />

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
                    <>
                        {urls.length === 0 && (search || status !== "all") ? (
                            <div className="bg-slate-800 rounded-xl p-10 border border-slate-700 text-center space-y-3">
                                <p className="text-slate-300 font-medium text-lg">No URLs found matching your filter criteria</p>
                                <p className="text-slate-400 text-sm">
                                    Try searching for a different URL or reset your status filter.
                                </p>
                                <button
                                    id="reset-filters-btn"
                                    onClick={handleResetFilters}
                                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm text-indigo-400 font-medium transition"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <UrlTable urls={urls} />
                        )}
                    </>
                )}
            </main>

            {showCreate && <CreateUrlModal onClose={() => setShowCreate(false)} />}
        </div>
    );
};

export default Dashboard;
