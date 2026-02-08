
import React, { useState } from 'react';

interface FirebaseConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FirebaseConfigModal: React.FC<FirebaseConfigModalProps> = ({ isOpen, onClose }) => {
    const [configJson, setConfigJson] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        try {
            let cleanJson = configJson.trim();
            // Remove potential variable declaration
            if (cleanJson.includes('=')) {
                cleanJson = cleanJson.substring(cleanJson.indexOf('=') + 1).trim();
            }
            if (cleanJson.endsWith(';')) {
                cleanJson = cleanJson.slice(0, -1);
            }

            // Fix unquoted keys (JavaScript Object -> JSON)
            // Replaces "key:" with ""key":"
            const jsonString = cleanJson.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

            const config = JSON.parse(jsonString);
            
            if (!config.apiKey || !config.projectId) {
                throw new Error("Invalid config object. Must contain 'apiKey' and 'projectId'.");
            }
            localStorage.setItem('firebase_config', JSON.stringify(config));
            window.location.reload();
        } catch (e: any) {
            console.error("Parsing error:", e);
            setError("Invalid format. Please paste the object exactly as shown in Firebase.");
        }
    };

    const handleReset = () => {
        if(window.confirm("This will clear any custom settings and use the built-in keys. Continue?")) {
            localStorage.removeItem('firebase_config');
            window.location.reload();
        }
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-800 rounded-2xl border border-slate-600 shadow-2xl w-full max-w-lg overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
                    <h2 className="text-xl font-bold text-orange-400">Connect Backend</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">&times;</button>
                </div>
                
                <div className="p-6 space-y-4">
                    <p className="text-slate-300 text-sm">
                        Your keys are currently <strong>hardcoded</strong> in the application. You only need to use this form if you want to override them with a different project.
                    </p>

                    <textarea 
                        className="w-full h-32 bg-slate-900 border border-slate-600 rounded-lg p-3 text-xs font-mono text-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        placeholder='Paste new config here to override...'
                        value={configJson}
                        onChange={(e) => setConfigJson(e.target.value)}
                    />

                    {error && <p className="text-red-400 text-xs bg-red-900/20 p-2 rounded border border-red-500/30">{error}</p>}

                    <div className="flex gap-3">
                        <button 
                            onClick={handleReset}
                            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition text-sm"
                        >
                            Reset to Hardcoded
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={!configJson.trim()}
                            className="flex-[2] bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition disabled:opacity-50"
                        >
                            Save Override
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirebaseConfigModal;
