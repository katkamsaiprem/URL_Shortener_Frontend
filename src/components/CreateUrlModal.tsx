import { useState } from "react";
import { useUrlStore } from "../store/urlStore";

interface Props {
    onClose: () => void;
}

const CreateUrlModal = ({ onClose }: Props) => {
    const addUrl = useUrlStore((s) => s.addUrl);
    const [formState, setFormState] = useState({
        originalUrl: "",
        expiresAt: "",
        error: "",
        loading: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState((prev) => ({ ...prev, error: "", loading: true }));
        try {
            await addUrl({
                originalUrl: formState.originalUrl,
                expiresAt: formState.expiresAt ? new Date(formState.expiresAt).toISOString() : undefined,
            });
            onClose();
        } catch {
            setFormState((prev) => ({ ...prev, error: "Failed to create URL. Try again.", loading: false }));
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 rounded-xl p-6 w-full max-w-md space-y-4 shadow-xl border border-slate-700"
            >
                <h2 className="text-xl font-bold text-indigo-400">Shorten a URL</h2>

                {formState.error && (
                    <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded">{formState.error}</p>
                )}

                <div>
                    <label className="block text-sm text-slate-300 mb-1">Original URL</label>
                    <input
                        id="create-original-url"
                        type="url"
                        required
                        value={formState.originalUrl}
                        onChange={(e) => setFormState((prev) => ({ ...prev, originalUrl: e.target.value }))}
                        placeholder="https://example.com/very/long/url"
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm text-slate-300 mb-1">
                        Expires At <span className="text-slate-500">(optional)</span>
                    </label>
                    <input
                        id="create-expires-at"
                        type="datetime-local"
                        value={formState.expiresAt}
                        onChange={(e) => setFormState((prev) => ({ ...prev, expiresAt: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>

                <div className="flex gap-3 justify-end pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-slate-400 hover:text-white transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={formState.loading}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition disabled:opacity-50"
                    >
                        {formState.loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUrlModal;