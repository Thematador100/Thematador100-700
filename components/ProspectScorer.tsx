
import React, { useState, useMemo } from 'react';
import { ScoredProspect } from '../types';

interface ProspectScorerProps {
    onScore: (prospectsToScore: string) => void;
    scoredProspects: ScoredProspect[] | null;
}

const ProspectScorer: React.FC<ProspectScorerProps> = ({ onScore, scoredProspects }) => {
    const [prospectsToScore, setProspectsToScore] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const sortedScoredProspects = useMemo(() => {
        if (!scoredProspects) return [];
        return [...scoredProspects].sort((a, b) => {
            if (sortOrder === 'desc') {
                return b.fitScore - a.fitScore;
            }
            return a.fitScore - b.fitScore;
        });
    }, [scoredProspects, sortOrder]);

    const getScoreColor = (score: number) => {
        if (score > 80) return 'text-green-400';
        if (score > 60) return 'text-yellow-400';
        return 'text-red-400';
    }

    const loadSampleData = () => {
        const sample = `John Smith - VP Engineering at TechCorp (Series B funded, hiring aggressively)
Sarah Jones - Marketing Manager at Small Local Agency (5 employees, manual reporting)
Mike Chen - CTO at Enterprise FinTech (Just suffered a data breach, needs compliance)
Amanda White - Freelance Graphic Designer (Looking for gigs, low budget)
David Miller - Director of Sales at Logistics Co (Struggling with lead gen, active on LinkedIn)`;
        setProspectsToScore(sample);
    };

    return (
        <div className="no-print bg-slate-800/70 rounded-xl border border-slate-700 shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-blue-300">Prospect Scoring & Refinement</h2>
            <p className="text-slate-400 mt-1 mb-6">Score the provided list of prospects against the generated Ideal Customer Profile to rank them by fit.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="prospectsToScore" className="block text-sm font-medium text-slate-300">
                        Raw Prospect List
                        </label>
                        <button 
                            onClick={loadSampleData}
                            className="text-xs text-blue-400 hover:text-blue-300 underline"
                        >
                            Load Sample Data
                        </button>
                    </div>
                    <textarea
                      id="prospectsToScore"
                      rows={10}
                      className="w-full bg-slate-800 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-slate-500 text-xs font-mono"
                      placeholder="Paste your unrefined list here, one prospect per line."
                      value={prospectsToScore}
                      onChange={(e) => setProspectsToScore(e.target.value)}
                    />
                    <button
                        onClick={() => onScore(prospectsToScore)}
                        disabled={!prospectsToScore.trim()}
                        className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition"
                    >
                        Score & Rank Prospects
                    </button>
                </div>
                <div>
                     <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-slate-200">Scored Results</h3>
                        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="text-sm text-blue-400 hover:underline">
                            Sort by Score {sortOrder === 'desc' ? '↓' : '↑'}
                        </button>
                    </div>
                    {scoredProspects ? (
                        <div className="h-80 overflow-y-auto bg-slate-900/50 rounded-md border border-slate-700">
                           <table className="w-full text-sm text-left text-slate-300 table-fixed">
                                <thead className="text-xs text-slate-400 uppercase bg-slate-800 sticky top-0">
                                    <tr>
                                        <th scope="col" className="px-4 py-2 w-1/3">Prospect</th>
                                        <th scope="col" className="px-4 py-2 w-1/6 text-center">Score</th>
                                        <th scope="col" className="px-4 py-2 w-1/2">Rationale</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedScoredProspects.map((p, i) => (
                                        <tr key={i} className="border-b border-slate-700 hover:bg-slate-800/50">
                                            <td className="px-4 py-2 font-medium text-slate-200 truncate" title={p.prospectInfo}>{p.prospectInfo}</td>
                                            <td className={`px-4 py-2 text-center font-bold ${getScoreColor(p.fitScore)}`}>{p.fitScore}</td>
                                            <td className="px-4 py-2 text-slate-400 italic relative group">
                                                <span className="block truncate">
                                                    {p.rationale}
                                                </span>
                                                <div className="absolute hidden group-hover:block bottom-full left-1/2 z-10 w-72 p-3 mb-2 -translate-x-1/2 text-xs font-normal text-slate-200 bg-slate-900 rounded-lg shadow-lg border border-slate-700 whitespace-normal">
                                                    {p.rationale}
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-700"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                           </table>
                        </div>
                    ) : (
                        <div className="h-80 flex items-center justify-center bg-slate-900/50 rounded-md border border-slate-700 text-slate-500 text-xs">
                            Run a strategy, paste prospects on the left, and click Score.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProspectScorer;
