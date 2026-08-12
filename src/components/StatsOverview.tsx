import type { ShortUrl } from "../types/url";
import StatsCard from "./StatsCard";

interface StatsOverviewProps {
    urls: ShortUrl[];
}

export const StatsOverview = ({ urls }: StatsOverviewProps) => {
    const now = new Date();

    const totalUrls = urls.length;
    const activeUrls = urls.filter(
        (url) => !url.expiresAt || new Date(url.expiresAt) > now
    ).length;
    const expiredUrls = urls.filter(
        (url) => url.expiresAt && new Date(url.expiresAt) <= now
    ).length;
    const totalVisits = urls.reduce((sum, url) => sum + (url.visitCount || 0), 0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatsCard
                title="Total URLs"
                value={totalUrls}
                description="Short links created"
                colorClass="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                bgGlow="bg-indigo-500"
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                }
            />
            <StatsCard
                title="Active URLs"
                value={activeUrls}
                description="Currently accessible"
                colorClass="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                bgGlow="bg-emerald-500"
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
            />
            <StatsCard
                title="Expired URLs"
                value={expiredUrls}
                description="Reached expiration date"
                colorClass="bg-rose-500/10 text-rose-400 border border-rose-500/20"
                bgGlow="bg-rose-500"
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
            />
            <StatsCard
                title="Total Visits"
                value={totalVisits.toLocaleString()}
                description="Cumulative clicks"
                colorClass="bg-amber-500/10 text-amber-400 border border-amber-500/20"
                bgGlow="bg-amber-500"
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                }
            />
        </div>
    );
};

export default StatsOverview;
