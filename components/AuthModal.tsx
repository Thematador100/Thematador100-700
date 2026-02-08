
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setGuestMode } = useAuth(); // We will add this to context

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // If auth is null (Firebase not configured), show error or fallback
        if (!auth) {
            setError("Database connection not configured. Please use Guest Mode.");
            setLoading(false);
            return;
        }

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                if (name) {
                    await updateProfile(userCredential.user, {
                        displayName: name
                    });
                }
            }
            onClose();
        } catch (err: any) {
            console.error(err);
            const errorMessage = err.message.replace('Firebase: ', '').replace(' (auth/', ': ').replace(').', '');
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGuestAccess = () => {
        if (setGuestMode) {
            setGuestMode();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-800 rounded-2xl border border-slate-600 shadow-2xl w-full max-w-md overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                        {isLogin ? 'Mission Access' : 'Initialize Profile'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-900/50 border border-red-500/50 text-red-200 text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    {!isLogin && (
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Agent Name</label>
                            <input 
                                type="text" 
                                required={!isLogin}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                placeholder="Codename or Full Name"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Secure Email</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="agent@audience.ai"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Passcode</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? 'Authenticating...' : (isLogin ? 'Access Terminal' : 'Create Profile')}
                    </button>
                </form>

                <div className="p-4 bg-slate-900/50 text-center border-t border-slate-700">
                    <button 
                        onClick={handleGuestAccess}
                        className="text-sm font-bold text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 bg-slate-800 rounded-lg py-2 px-4 w-full mb-4 transition"
                    >
                        CONTINUE AS GUEST (OFFLINE MODE)
                    </button>
                    <p className="text-sm text-slate-400">
                        {isLogin ? "Don't have clearance?" : "Already have an identity?"}
                        <button 
                            onClick={() => { setIsLogin(!isLogin); setError(''); }}
                            className="ml-2 text-teal-400 hover:text-teal-300 font-semibold hover:underline"
                        >
                            {isLogin ? 'Request Access' : 'Log In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
