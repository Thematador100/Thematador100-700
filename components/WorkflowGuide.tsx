
import React from 'react';

interface WorkflowGuideProps {
    isOpen: boolean;
    onClose: () => void;
}

const Step: React.FC<{ number: string; title: string; description: string; icon: string }> = ({ number, title, description, icon }) => (
    <div className="flex gap-4 items-start p-4 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">
            {number}
        </div>
        <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span className="text-2xl">{icon}</span> {title}
            </h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">{description}</p>
        </div>
    </div>
);

const WorkflowGuide: React.FC<WorkflowGuideProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-slate-900 rounded-2xl border-2 border-blue-500/50 shadow-2xl w-full max-w-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                        Operational Workflow
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">&times;</button>
                </div>
                
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <p className="text-slate-300 mb-4">
                        Welcome, Operator. This tool works in a specific 3-step loop to generate high-value leads.
                    </p>

                    <Step 
                        number="1" 
                        title="Define the Target" 
                        icon="🎯"
                        description="In the 'Mission Briefing' form, enter a market (e.g., 'Commercial Real Estate Software') and select 'B2B ICP Analysis'. Click 'Analyze ICP' to generate the intelligence."
                    />

                    <Step 
                        number="2" 
                        title="Get the Blueprint" 
                        icon="📡"
                        description="The AI will generate a report. Read the 'Quantitative Model'—this is the mathematical formula the AI created to decide who buys your product."
                    />

                    <Step 
                        number="3" 
                        title="Score Your Leads" 
                        icon="⚖️"
                        description="Scroll down to the 'Prospect Scoring' section. Paste a raw list of names, job titles, or LinkedIn bios. Click 'Score & Rank'. The AI will apply the formula from Step 2 to filter your list for you."
                    />
                </div>

                <div className="p-6 border-t border-slate-800 bg-slate-950/30 text-center">
                    <button 
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition"
                    >
                        Understood - Initialize
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkflowGuide;
