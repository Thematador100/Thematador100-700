
import React from 'react';
import { EdgarAnomalyReport } from '../types';

interface EdgarAnomalyReportProps {
    report: EdgarAnomalyReport;
}

const Methodology: React.FC<{ models: string[] | undefined }> = ({ models }) => {
    if (!models || models.length === 0) return null;
    return (
        <div className="mt-8 pt-6 border-t border-slate-700">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Analytical Methodology</h4>
            <div className="flex flex-wrap gap-2">
                {models.map(model => (
                    <span key={model} className="text-xs text-slate-400 bg-slate-950/50 border border-slate-700 rounded px-2 py-0.5">{model}</span>
                ))}
            </div>
        </div>
    );
};

const VerdictBadge: React.FC<{ summary: string }> = ({ summary }) => {
    let status = 'CAUTION';
    let color = 'bg-yellow-900/50 text-yellow-300 border-yellow-700';
    let icon = '⚠️';

    if (summary.includes('DANGER') || summary.includes('CRITICAL') || summary.includes('SHORT')) {
        status = 'DANGER';
        color = 'bg-red-900/50 text-red-300 border-red-700';
        icon = '🛑';
    } else if (summary.includes('SAFE') || summary.includes('STRONG') || summary.includes('BUY')) {
        status = 'SAFE / INVESTABLE';
        color = 'bg-green-900/50 text-green-300 border-green-700';
        icon = '🛡️';
    }

    return (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${color} mb-4 font-bold text-sm shadow-lg`}>
            <span>{icon}</span>
            <span>FORENSIC VERDICT: {status}</span>
        </div>
    );
};

const EdgarAnomalyReportComponent: React.FC<EdgarAnomalyReportProps> = ({ report }) => {
    const hasFlags = report.redFlags && report.redFlags.length > 0;

    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border-2 border-red-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
                <VerdictBadge summary={report.executiveSummary} />
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                    🔍 Forensic Anomaly Scan
                </h2>
                <p className="text-slate-400 mt-2 mb-8">Target: <span className="font-mono text-slate-200 font-bold">{report.companyIdentifier}</span></p>
                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 text-left">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Executive Summary</h3>
                    <p className="text-slate-200 text-sm leading-relaxed">{report.executiveSummary}</p>
                </div>
            </div>

            <div className="mt-8 space-y-8">
                {/* Red Flags Section */}
                <div className={`p-6 rounded-lg border ${hasFlags ? 'bg-red-900/10 border-red-500/50' : 'bg-green-900/10 border-green-500/50'}`}>
                    <h3 className={`text-xl font-bold mb-4 ${hasFlags ? 'text-red-400' : 'text-green-400'}`}>
                        {hasFlags ? '🚩 Identified Red Flags & Risks' : '✅ Clean Bill of Health'}
                    </h3>
                    
                    {hasFlags ? (
                        <div className="space-y-3">
                            {report.redFlags.map((flag, i) => (
                                <div key={i} className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 flex gap-4">
                                    <div className="text-red-500 font-bold text-lg select-none">!</div>
                                    <div>
                                        <p className="text-slate-200 text-sm font-semibold">{flag.flag}</p>
                                        <p className="text-xs text-red-300 mt-1 font-mono">📉 Implication: {flag.implication}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-slate-300 text-sm">
                                No major forensic anomalies detected. This suggests a potentially stable "Safe Haven" investment or a company with a strong defensive moat.
                            </p>
                            <p className="text-green-400 text-xs mt-2 font-bold uppercase">Opportunity: Long / Value Play</p>
                        </div>
                    )}
                </div>

                {/* Anomalies Section */}
                {report.anomalies && report.anomalies.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-3">Data Anomalies (Accounting irregularities)</h3>
                        <div className="space-y-4">
                            {report.anomalies.map((anomaly, i) => (
                                <div key={i} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-slate-100 text-sm">{anomaly.type}</h4>
                                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${anomaly.severity === 'High' ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'}`}>
                                            {anomaly.severity} Severity
                                        </span>
                                    </div>
                                    <p className="text-slate-300 text-sm">{anomaly.description}</p>
                                    <p className="text-[10px] text-slate-500 mt-2 font-mono">Source: {anomaly.sourceLocation}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pt-6 border-t border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-200 mb-3">Evidence Locker (Source Filings)</h3>
                    <ul className="text-xs text-blue-400 space-y-2">
                        {report.sourceFilings.map((filing, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <span>📄</span>
                                <a href={filing.uri} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-300 transition">{filing.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Methodology models={report.methodology} />
        </div>
    );
};

export default EdgarAnomalyReportComponent;
