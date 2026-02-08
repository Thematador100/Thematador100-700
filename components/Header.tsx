
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import WorkflowGuide from './WorkflowGuide';

interface HeaderProps {
    currentView: 'strategy' | 'commandCenter';
    onSetView: (view: 'strategy' | 'commandCenter') => void;
    onShowProjects: () => void;
    onShowAuth: () => void;
    onConfigureBackend?: () => void;
}


const Header: React.FC<HeaderProps> = ({ currentView, onSetView, onShowProjects, onShowAuth, onConfigureBackend }) => {
  const { currentUser, logout, setGuestMode } = useAuth();
  const [showGuide, setShowGuide] = useState(false);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all saved data and reset the application? This includes your agent workforce and saved projects (locally). This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleLogout = async () => {
      try {
          await logout();
      } catch (error) {
          console.error("Failed to log out", error);
      }
  }

  return (
    <>
    <header className="py-6 bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4 gap-4">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
           <button 
                onClick={() => onSetView('strategy')} 
                className={`flex items-center space-x-2 text-xs text-slate-300 hover:text-white rounded-md px-3 py-2 transition whitespace-nowrap ${currentView === 'strategy' ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700 border border-slate-700'}`}
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                 </svg>
                <span>Strategy</span>
            </button>
            <button 
                onClick={() => onSetView('commandCenter')} 
                className={`flex items-center space-x-2 text-xs text-slate-300 hover:text-white rounded-md px-3 py-2 transition whitespace-nowrap ${currentView === 'commandCenter' ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700 border border-slate-700'}`}
            >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3v3m-3-3v3m-3-3v3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <span>Command Center</span>
            </button>
             <button 
                onClick={onShowProjects} 
                className="flex items-center space-x-2 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md px-3 py-2 transition whitespace-nowrap"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                <span>Projects</span>
            </button>
        </div>
        <div className="text-center hidden lg:block">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
              AudienceAI
            </h1>
            <p className="text-slate-400 mt-1 text-xs">Predictive Prospecting Engine</p>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setShowGuide(true)}
                className="flex items-center space-x-2 text-xs text-amber-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-amber-500/50 rounded-md px-3 py-2 transition"
                title="How to use"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="hidden sm:inline">Guide</span>
            </button>

            {currentUser ? (
                <div className="flex items-center gap-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-teal-300">{currentUser.displayName || 'Agent'}</p>
                        <p className="text-[10px] text-slate-500">{currentUser.email}</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md px-3 py-2 transition"
                    >
                        <span>Logout</span>
                    </button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <button 
                        onClick={() => setGuestMode()}
                        className="flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 bg-slate-800 rounded-md px-3 py-2 transition"
                    >
                        <span>Guest Mode</span>
                    </button>
                    <button 
                        onClick={onShowAuth}
                        className="flex items-center space-x-2 text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 rounded-md px-4 py-2 transition shadow-lg"
                    >
                        <span>Login / Signup</span>
                    </button>
                </div>
            )}
            
            {onConfigureBackend && (
                <button 
                    onClick={onConfigureBackend}
                    className="flex items-center space-x-2 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md px-3 py-2 transition"
                    title="Configure Database Connection"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            )}

            <button 
                onClick={handleReset} 
                className="flex items-center space-x-2 text-xs text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md px-3 py-2 transition"
                title="Clear all saved data"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
      </div>
    </header>
    <WorkflowGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </>
  );
};

export default Header;
