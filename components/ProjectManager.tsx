
import React from 'react';
import { Project } from '../types';

interface ProjectManagerProps {
    isVisible: boolean;
    onClose: () => void;
    projects: Project[];
    onLoadProject: (projectId: string) => void;
    onDeleteProject: (projectId: string) => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ isVisible, onClose, projects, onLoadProject, onDeleteProject }) => {
    if (!isVisible) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-lg border border-slate-700 shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-slate-100">Project Manager</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
                </div>
                <div className="p-4 overflow-y-auto">
                    {projects.length === 0 ? (
                        <p className="text-slate-400 text-center py-8">No saved projects yet.</p>
                    ) : (
                        <ul className="space-y-3">
                            {projects.map((project, index) => {
                                if (!project) return null;
                                return (
                                    <li key={project.id || index} className="bg-slate-900/50 p-3 rounded-md border border-slate-700 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-slate-200">{project.name || 'Untitled Project'}</p>
                                            <p className="text-xs text-slate-400">{project.timestamp ? new Date(project.timestamp).toLocaleString() : 'Unknown Date'}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => onLoadProject(project.id)}
                                                className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-md transition"
                                            >
                                                Load
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    if(window.confirm(`Are you sure you want to delete the project "${project.name || 'Untitled'}"?`)) {
                                                        onDeleteProject(project.id)
                                                    }
                                                }}
                                                className="text-xs bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-md transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectManager;
