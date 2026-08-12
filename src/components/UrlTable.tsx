import { useState } from "react";
import type { ShortUrl } from "../types/url";
import EditUrlModal from "./EditUrlModal";
import DeleteDialog from "./DeleteDialog";
import StatusBadge from "./StatusBadge";

interface Props {
    urls: ShortUrl[];
}

const UrlTable = ({ urls }: Props) => {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [editTarget, setEditTarget] = useState<ShortUrl | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

    const handleCopy = async (url: ShortUrl) => {
        const shortUrl = `${baseUrl}/${url.shortCode}`;
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopiedId(url.id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "Never";
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (urls.length === 0) {
        return (
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
                <p className="text-slate-400">
                    No URLs yet. Create one to get started.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-300">
                        <thead className="text-xs uppercase text-slate-400 bg-slate-800/50 border-b border-slate-700">
                            <tr>
                                <th className="py-4 px-6">Original URL</th>
                                <th className="py-4 px-6">Short Link</th>
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6">Visits</th>
                                <th className="py-4 px-6">Created</th>
                                <th className="py-4 px-6">Expires</th>
                                <th className="py-4 px-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urls.map((url) => (
                                <tr key={url.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition last:border-0">
                                    <td className="py-4 px-6 max-w-[200px] truncate" title={url.originalUrl}>
                                        <a href={url.originalUrl} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-indigo-400 transition">
                                            {url.originalUrl}
                                        </a>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <a href={`${baseUrl}/${url.shortCode}`} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                                                {baseUrl}/{url.shortCode}
                                            </a>
                                            <button
                                                id={`copy-${url.id}`}
                                                onClick={() => handleCopy(url)}
                                                className={`text-xs px-2 py-1 rounded transition ${copiedId === url.id
                                                    ? "bg-green-600/20 text-green-400 border border-green-600/30"
                                                    : "bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-300"
                                                    }`}
                                            >
                                                {copiedId === url.id ? "Copied!" : "Copy"}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <StatusBadge expiresAt={url.expiresAt} />
                                    </td>
                                    <td className="py-4 px-6 font-medium">{url.visitCount}</td>
                                    <td className="py-4 px-6 text-slate-400">
                                        {formatDate(url.createdAt)}
                                    </td>
                                    <td className="py-4 px-6 text-slate-400">
                                        {formatDate(url.expiresAt)}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <button
                                                id={`edit-${url.id}`}
                                                onClick={() => setEditTarget(url)}
                                                className="text-xs px-3 py-1.5 bg-slate-700 hover:bg-indigo-600 text-white rounded transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                id={`delete-${url.id}`}
                                                onClick={() => setDeleteId(url.id)}
                                                className="text-xs px-3 py-1.5 bg-slate-700 hover:bg-red-600 text-white rounded transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {editTarget && (
                <EditUrlModal url={editTarget} onClose={() => setEditTarget(null)} />
            )}

            {/* Delete Confirmation */}
            {deleteId && (
                <DeleteDialog id={deleteId} onClose={() => setDeleteId(null)} />
            )}
        </>
    );
};

export default UrlTable;