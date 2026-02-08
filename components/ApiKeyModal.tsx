import React, { useState } from 'react';

interface ApiKeyModalProps {
    onSubmit: (apiKey: string) => void;
    error: string | null;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSubmit, error }) => {
    const [apiKey, setApiKey] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (apiKey.trim()) {
            onSubmit(apiKey.trim());
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-xl w-full max-w-md">
                <div className="p-6 text-center">
                    <h2 className="text-2xl font-bold text-slate-100">Welcome to AudienceAI</h2>
                    <p className="text-slate-400 my-4">
                        To get started, please enter your Google AI Gemini API key. Your key is stored securely in your browser's session storage and is never saved elsewhere.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter your Gemini API Key"
                            className="w-full bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            aria-label="Gemini API Key"
                        />
                         <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline block">
                            Get your API Key from Google AI Studio
                        </a>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button
                            type="submit"
                            disabled={!apiKey.trim()}
                            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition"
                        >
                            Start Analysis
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyModal;
