interface StatusBadgeProps {
    expiresAt: string | null;
}

const StatusBadge = ({ expiresAt }: StatusBadgeProps) => {
    const isExpired = expiresAt ? new Date(expiresAt) <= new Date() : false;

    if (isExpired) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400"></span>
                Expired
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Active
        </span>
    );
};

export default StatusBadge;