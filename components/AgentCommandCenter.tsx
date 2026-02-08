
import React, { useState } from 'react';
import { SovereignAgent, SovereignTask } from '../types';

const ActionableOutput: React.FC<{ output: SovereignTask['actionableOutput'], onBuildTool: (prompt: string) => void }> = ({ output, onBuildTool }) => {
    const [copySuccess, setCopySuccess] = useState('');
    if (!output || output.length === 0) return null;

    const handleCopy = (content: string, title: string) => {
        navigator.clipboard.writeText(content).then(() => {
            setCopySuccess(title);
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };
    
    return (
        <div className="space-y-2">
            {output.map((item, idx) => (
                 <div key={idx} className="bg-slate-950/70 p-2 rounded-lg border border-slate-700">
                    <div className="flex justify-between items-center">
                        <h5 className="font-semibold text-cyan-300 text-xs">{item.title || 'Output'}</h5>
                        {item.type !== 'integration' && (
                            <button onClick={() => handleCopy(item.content, item.title || 'content')} className="text-[10px] bg-slate-700 hover:bg-slate-600 text-white font-semibold py-0.5 px-2 rounded-md transition">
                                {copySuccess === (item.title || 'content') ? 'Copied!' : 'Copy'}
                            </button>
                        )}
                    </div>
                    <pre className="text-slate-300 text-[10px] whitespace-pre-wrap font-mono mt-1">
                        <code>{item.content}</code>
                    </pre>
                    {item.type === 'integration' && item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[10px] mt-1 inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold py-0.5 px-2 rounded-md transition">
                            Visit Tool
                        </a>
                    )}
                    {item.type === 'microToolBlueprint' && (
                        <button 
                            onClick={() => onBuildTool(item.content)}
                            className="text-xs mt-2 w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-1 px-2 rounded-md transition"
                        >
                            Build This Tool
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

const AgenticFeedback: React.FC<{ task: SovereignTask; agentId: string; onAssignTask: (agentId: string, taskBrief: string) => void; }> = ({ task, agentId, onAssignTask }) => {
    if (task.status !== 'Completed') return null;
    if (!task.insight && !task.suggestedNextTask) return null;

    return (
        <div className="mt-2 pt-2 border-t border-slate-700/50 space-y-2">
            {task.insight && (
                <div className="bg-slate-950/70 p-2 rounded-lg border border-blue-500/20">
                    <p className="font-semibold text-blue-300 text-xs flex items-center gap-2">
                        <span className="text-lg">💡</span>
                        Capability Briefing
                    </p>
                    <p className="text-xs text-slate-400 mt-1 pl-6">{task.insight}</p>
                </div>
            )}
            {task.suggestedNextTask && (
                <div className="bg-slate-950/70 p-2 rounded-lg border border-teal-500/20">
                     <p className="font-semibold text-teal-300 text-xs flex items-center gap-2">
                        <span className="text-lg">➡️</span>
                        Suggested Next Task
                    </p>
                    <div className="flex items-center justify-between gap-2 mt-1 pl-6">
                        <p className="text-xs text-slate-300 italic flex-grow">"{task.suggestedNextTask}"</p>
                         <button 
                            onClick={() => onAssignTask(agentId, task.suggestedNextTask!)}
                            className="text-[10px] bg-teal-600 hover:bg-teal-500 text-white font-semibold py-1 px-2 rounded-md transition flex-shrink-0"
                        >
                            Assign
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


const TaskLog: React.FC<{ task: SovereignTask; agentId: string; onAssignTask: (agentId: string, taskBrief: string) => void; onBuildTool: (prompt: string) => void; }> = ({ task, agentId, onAssignTask, onBuildTool }) => {
    const statusConfig: { [key in SovereignTask['status']]: { color: string; icon: string } } = {
        Pending: { color: 'text-yellow-400', icon: '…' },
        Waiting: { color: 'text-slate-400', icon: '⏳' },
        Executing: { color: 'text-blue-400', icon: '⚙️' },
        Completed: { color: 'text-green-400', icon: '✓' },
        Failed: { color: 'text-red-400', icon: '✗' },
    };
    // Safe fallback if status is unknown
    const currentStatus = statusConfig[task.status] || statusConfig['Pending'];
    const pulseClass = task.status === 'Executing' ? 'animate-pulse' : '';
    
    return (
        <div className="p-2 bg-slate-800/50 rounded-lg">
            <div className="flex justify-between items-start gap-2">
                <p className="text-xs text-slate-300 flex-grow"><strong className={`mr-2 ${currentStatus.color}`}>{currentStatus.icon}</strong>{task.brief}</p>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${currentStatus.color} ${pulseClass}`}>{task.status}</span>
            </div>
            {task.status === 'Completed' && task.actionableOutput && (
                <div className="mt-2 pt-2 border-t border-slate-700/50">
                    <ActionableOutput output={task.actionableOutput} onBuildTool={onBuildTool} />
                </div>
            )}
            <AgenticFeedback task={task} agentId={agentId} onAssignTask={onAssignTask} />
        </div>
    );
};


const AgentCard: React.FC<{ agent: SovereignAgent; onAssignTask: (agentId: string, taskBrief: string) => void; onBuildTool: (prompt: string) => void; }> = ({ agent, onAssignTask, onBuildTool }) => {
    const [newTaskBrief, setNewTaskBrief] = useState('');

    const handleAssign = () => {
        if (newTaskBrief.trim()) {
            onAssignTask(agent.id, newTaskBrief);
            setNewTaskBrief('');
        }
    };
    
    const statusConfig = {
        Idle: { color: 'text-green-400', bgColor: 'bg-green-900/50' },
        Active: { color: 'text-blue-400', bgColor: 'bg-blue-900/50', pulse: true },
        Error: { color: 'text-red-400', bgColor: 'bg-red-900/50' },
    };
    // Safe fallback for status
    const currentStatus = statusConfig[agent.status] || statusConfig['Idle'];
    const pulseClass = (agent.status === 'Active' && currentStatus.pulse) ? 'animate-pulse' : '';
    
    // Defensive check for tasks array - CRITICAL FIX FOR BLACK SCREEN
    const tasks = Array.isArray(agent.tasks) ? agent.tasks : [];

    return (
        <div className="bg-slate-800/70 rounded-xl border border-slate-700 shadow-lg flex flex-col h-full">
            <div className="p-4 border-b border-slate-700/50">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-slate-100 pr-2">{agent.agentType || 'Unknown Agent'}</h3>
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full ${currentStatus.bgColor} ${currentStatus.color} ${pulseClass}`}>
                        {agent.status || 'Idle'}
                    </div>
                </div>
                <p className="text-xs text-slate-400 mt-1">{agent.overallBrief || 'No brief provided.'}</p>
            </div>
            <div className="p-4 space-y-3 flex-grow overflow-y-auto">
                 <h4 className="font-semibold text-slate-400 text-xs uppercase">Task Log</h4>
                 <div className="space-y-2">
                    {tasks.length > 0 ? (
                        [...tasks].reverse().map((task, i) => (
                            <TaskLog 
                                key={task.id || i} 
                                task={task} 
                                agentId={agent.id} 
                                onAssignTask={onAssignTask} 
                                onBuildTool={onBuildTool} 
                            />
                        ))
                    ) : (
                        <p className="text-xs text-slate-500 text-center py-4">No tasks assigned.</p>
                    )}
                 </div>
            </div>
             <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newTaskBrief}
                        onChange={(e) => setNewTaskBrief(e.target.value)}
                        placeholder="Assign new task..."
                        className="flex-grow bg-slate-900 border border-slate-600 rounded-md p-2 text-sm text-slate-200 placeholder-slate-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleAssign()}
                    />
                    <button onClick={handleAssign} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition text-sm">
                        Assign
                    </button>
                </div>
            </div>
        </div>
    );
};

const OperationsManual: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 bg-slate-900/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
        <div className="bg-slate-800 rounded-xl border border-slate-600 shadow-2xl max-w-2xl w-full p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl">&times;</button>
            <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <span className="text-3xl">📘</span> Sovereign Engine Operations Manual
            </h2>
            
            <div className="space-y-6 text-slate-300">
                <div className="flex gap-4">
                    <div className="bg-slate-700/50 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg text-blue-400 flex-shrink-0">1</div>
                    <div>
                        <h3 className="font-bold text-blue-300 text-lg">Initialize Workforce</h3>
                        <p className="text-sm mt-1">Agents are not created here directly. You must first go to the <strong>Strategy</strong> tab and generate a report (e.g., Archimedes Protocol, Lone Wolf, Alpha Signal).</p>
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <div className="bg-slate-700/50 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg text-teal-400 flex-shrink-0">2</div>
                    <div>
                        <h3 className="font-bold text-teal-300 text-lg">Deploy Agents</h3>
                        <p className="text-sm mt-1">At the bottom of every strategic report, look for the <strong>"Deploy AI Agents"</strong> button. Clicking this instantiates specialized agents based on that specific strategy.</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="bg-slate-700/50 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg text-purple-400 flex-shrink-0">3</div>
                    <div>
                        <h3 className="font-bold text-purple-300 text-lg">Command & Execute</h3>
                        <p className="text-sm mt-1">Return to this <strong>Command Center</strong>. You will see your active agents. Type tasks into their terminal to execute specific parts of the plan.</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700 text-center">
                <button onClick={onClose} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition">
                    Acknowledged
                </button>
            </div>
        </div>
    </div>
);

interface AgentCommandCenterProps {
    workforce: SovereignAgent[];
    onAssignTask: (agentId: string, taskBrief: string) => void;
    onBuildToolFromAgent: (prompt: string) => void;
    onGoToStrategy: () => void;
}

const AgentCommandCenter: React.FC<AgentCommandCenterProps> = ({ workforce, onAssignTask, onBuildToolFromAgent, onGoToStrategy }) => {
    const [showGuide, setShowGuide] = useState(false);

    // Ensure workforce is an array to prevent crashes
    const safeWorkforce = Array.isArray(workforce) ? workforce : [];

    if (safeWorkforce.length === 0) {
        return (
             <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-fade-in">
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-xl max-w-lg">
                    <div className="text-6xl mb-6">🤖</div>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
                        Workforce Offline
                    </h1>
                    <p className="text-slate-400 mt-4 leading-relaxed">
                        The Sovereign Engine is currently empty. You have not deployed any agents yet.
                    </p>
                    <div className="mt-8 space-y-4">
                        <button 
                            onClick={onGoToStrategy}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg flex items-center justify-center gap-2"
                        >
                            <span>🚀</span> Go to Strategy & Deploy
                        </button>
                        <button 
                            onClick={() => setShowGuide(true)}
                            className="text-sm text-slate-500 hover:text-slate-300 underline"
                        >
                            How does this work?
                        </button>
                    </div>
                </div>
                {showGuide && <OperationsManual onClose={() => setShowGuide(false)} />}
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
                <div className="text-center sm:text-left">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
                        Agent Command Center
                    </h1>
                    <p className="text-slate-400 mt-2">Active Sovereign Workforce: <span className="text-white font-bold">{safeWorkforce.length} Units</span></p>
                </div>
                <button 
                    onClick={() => setShowGuide(true)}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg border border-slate-700 transition text-sm font-semibold"
                >
                    <span>📘</span> Operations Manual
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
                {safeWorkforce.map((agent, i) => (
                    // Fallback key if id is missing
                    <AgentCard key={agent.id || i} agent={agent} onAssignTask={onAssignTask} onBuildTool={onBuildToolFromAgent} />
                ))}
            </div>
            
            {showGuide && <OperationsManual onClose={() => setShowGuide(false)} />}
        </div>
    );
};

export default AgentCommandCenter;
