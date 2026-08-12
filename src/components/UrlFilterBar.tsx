import type { UrlStatusFilter } from "../types/url";

interface Props {
    search: string;
    onSearchChange: (value: string) => void;
    status: UrlStatusFilter;
    onStatusChange: (status: UrlStatusFilter) => void;
}

const UrlFilterBar = ({ search, onSearchChange, status, onStatusChange }: Props) => {
    const statusOptions: { label: string; value: UrlStatusFilter; countBadge?: string }[] = [
        { label: "All Links", value: "all" },
        { label: "Active", value: "active" },
        { label: "Expired", value: "expired" },
    ];

    return (
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-sm">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    id="search-url-input"
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by original URL..."
                    className="w-full pl-9 pr-8 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
                {search && (
                    <button
                        id="clear-search-btn"
                        onClick={() => onSearchChange("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition"
                        title="Clear search"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Status Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 border border-slate-700/80 rounded-lg w-full md:w-auto">
                {statusOptions.map((option) => {
                    const isActive = status === option.value;
                    return (
                        <button
                            key={option.value}
                            id={`filter-status-${option.value}`}
                            onClick={() => onStatusChange(option.value)}
                            className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-md text-xs font-medium transition ${
                                isActive
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                            }`}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default UrlFilterBar;
