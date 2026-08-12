import { useState } from "react";
import { useUrlStore } from "../store/urlStore";

interface Props {
    id: string;
    onClose: () => void;
}

const DeleteDialog = ({ id, onClose }: Props) => {
    const removeUrl = useUrlStore((s) => s.removeUrl);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        setLoading(true);
        setError("");
        try {
            await removeUrl(id);
            onClose();
        } catch {
            setError("Failed to delete URL. Try again.");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-sm space-y-4 shadow-xl border border-slate-700">
                <h2 className="text-xl font-bold text-white">Delete URL?</h2>
                <p className="text-slate-400 text-sm">
                    This action cannot be undone. The short link will stop working immediately.
                </p>

                {error && (
                    <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded">{error}</p>
                )}

                <div className="flex gap-3 justify-end pt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-400 hover:text-white transition"
                    >
                        Cancel
                    </button>
                    <button
                        id="confirm-delete"
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded transition disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDialog;