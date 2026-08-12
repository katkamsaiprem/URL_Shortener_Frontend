import type { ReactNode } from "react";

interface StatsCardProps {
    title: string;
    value: number | string;
    description: string;
    icon: ReactNode;
    colorClass: string;
    bgGlow: string;
}

export const StatsCard = ({
    title,
    value,
    description,
    icon,
    colorClass,
    bgGlow,
}: StatsCardProps) => {
    return (
        <div className="relative overflow-hidden bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/60 shadow-xl transition-all duration-300 hover:border-slate-600 hover:-translate-y-1">
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none ${bgGlow}`} />

            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
                    <h3 className="text-3xl font-extrabold text-white mt-2 tracking-tight">{value}</h3>
                    <p className="text-xs text-slate-400 mt-1">{description}</p>
                </div>
                <div className={`p-3 rounded-xl ${colorClass}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;

