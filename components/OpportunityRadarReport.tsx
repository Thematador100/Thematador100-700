
import React from 'react';
import { OpportunityRadarReport, AICode } from '../types';
import jsPDF from 'jspdf';

interface OpportunityRadarReportProps {
    report: OpportunityRadarReport;
    onGenerateCode: (prompt: string) => void;
    generatedCode: AICode | null;
}

// Utility to safely render content
const safeRender = (content: any): React.ReactNode => {
    if (typeof content === 'string') return content;
    if (typeof content === 'number') return content;
    if (!content) return null;
    if (typeof content === 'object') return JSON.stringify(content);
    return String(content);
};

const safeArray = (arr: any) => Array.isArray(arr) ? arr : [];

const Methodology: React.FC<{ models: string[] | undefined }> = ({ models }) => {
    const safeModels = safeArray(models);
    if (safeModels.length === 0) return null;
    return (
        <div className="mt-8 pt-6 border-t border-slate-700">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Analytical Methodology</h4>
            <div className="flex flex-wrap gap-2">
                {safeModels.map((model: any, i: number) => (
                    <span key={i} className="text-xs text-slate-400 bg-slate-950/50 border border-slate-700 rounded px-2 py-0.5">{safeRender(model)}</span>
                ))}
            </div>
        </div>
    );
};

export const OpportunityRadarReportComponent: React.FC<OpportunityRadarReportProps> = ({ report, onGenerateCode, generatedCode }) => {
    if (!report) return null;

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        
        // Header
        doc.setFillColor(30, 41, 59); // Slate-900 like
        doc.rect(0, 0, pageWidth, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("Opportunity Radar: Investment Dossier", 15, 20);
        doc.setFontSize(10);
        doc.setTextColor(148, 163, 184); // Slate-400
        doc.text(`Sector: ${report.sector} | Date: ${new Date().toLocaleDateString()}`, 15, 30);

        // Executive Summary
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text("Executive Summary", 15, 50);
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);
        const splitSummary = doc.splitTextToSize(report.executiveSummary, pageWidth - 30);
        doc.text(splitSummary, 15, 60);

        // Trends
        let yPos = 60 + (splitSummary.length * 5) + 15;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("Real-Time Market Signals", 15, yPos);
        yPos += 10;
        
        report.realTimeTrends.forEach((trend, i) => {
            doc.setFontSize(11);
            doc.setTextColor(0, 50, 150); // Dark Blue
            doc.text(`${i+1}. ${trend.trendName}`, 15, yPos);
            yPos += 5;
            doc.setFontSize(10);
            doc.setTextColor(80, 80, 80);
            doc.text(`Signal: ${trend.growthSignal}`, 20, yPos);
            yPos += 5;
            const splitWhy = doc.splitTextToSize(`Impact: ${trend.whyItMatters}`, pageWidth - 40);
            doc.text(splitWhy, 20, yPos);
            yPos += (splitWhy.length * 5) + 5;
        });

        // Best Opportunity
        yPos += 10;
        if (yPos > 250) { doc.addPage(); yPos = 20; }
        
        doc.setFillColor(240, 248, 255); // Light Blue bg
        doc.rect(10, yPos, pageWidth - 20, 60, 'F');
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text("Top Alpha Opportunity: " + report.bestOpportunity.name, 15, yPos + 15);
        
        doc.setFontSize(10);
        doc.text(`Pain Point: ${report.bestOpportunity.painPoint}`, 15, yPos + 25);
        doc.text(`Target: ${report.bestOpportunity.starvingCrowd}`, 15, yPos + 35);
        doc.text(`Market Size: ${report.bestOpportunity.marketSize}`, 15, yPos + 45);
        
        doc.setFontSize(12);
        doc.setTextColor(220, 38, 38); // Red
        doc.text("10x AI Multiplier Strategy:", 15, yPos + 55);
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);
        doc.text(report.aiMultiplierStrategy.coreSolution, 15, yPos + 65);

        doc.save(`Opportunity_Radar_${report.sector.replace(/\s/g, '_')}.pdf`);
    };

    const handleBuildMVP = () => {
        const prompt = `Build a functional MVP for this opportunity:
        Name: ${report.bestOpportunity.name}
        Core Problem: ${report.bestOpportunity.painPoint}
        Solution: ${report.aiMultiplierStrategy.coreSolution}
        10x Mechanism: ${report.aiMultiplierStrategy.the10xMechanism}
        
        Create a high-converting landing page that includes a functional micro-tool widget demonstrating the '10x Mechanism' to capture leads. Use Tailwind CSS.`;
        
        onGenerateCode(prompt);
    };

    return (
        <div className="max-w-5xl mx-auto bg-slate-900/80 backdrop-blur-md rounded-2xl border-2 border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.15)] p-6 sm:p-10 animate-fade-in relative overflow-hidden">
            
            {/* Radar Scan Effect Overlay */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 animate-scan pointer-events-none"></div>

            <div className="flex justify-between items-start mb-10">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 mb-4">
                        <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">Live Market Scan Active</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Opportunity Radar:</span> {safeRender(report.sector)}
                    </h2>
                    <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">{safeRender(report.executiveSummary)}</p>
                </div>
                <div className="hidden sm:block">
                    <button 
                        onClick={handleDownloadPDF}
                        className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg border border-slate-600 transition shadow-lg flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Download Investment Dossier
                    </button>
                </div>
            </div>

            {/* Real Time Trends */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {safeArray(report.realTimeTrends).map((trend: any, i: number) => (
                    <div key={i} className="group relative bg-slate-800/40 p-5 rounded-xl border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:bg-slate-800/60">
                        <div className="absolute top-4 right-4 text-xs font-mono text-slate-500 group-hover:text-indigo-400 transition-colors">#{i+1}</div>
                        <h3 className="font-bold text-slate-100 text-lg mb-2 group-hover:text-indigo-300 transition-colors">{safeRender(trend.trendName)}</h3>
                        <p className="text-xs text-green-400 font-mono mb-3 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            {safeRender(trend.growthSignal)}
                        </p>
                        <p className="text-sm text-slate-400 leading-snug">{safeRender(trend.whyItMatters)}</p>
                        {trend.sourceUrl && (
                            <a href={trend.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-[10px] text-indigo-400 hover:text-indigo-300 hover:underline">
                                Source Inquiry &rarr;
                            </a>
                        )}
                    </div>
                ))}
            </div>

            {/* The Best Opportunity */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-indigo-500/30 overflow-hidden mb-8 relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <svg className="w-64 h-64 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" /></svg>
                </div>
                
                <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                
                <div className="p-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Top Selected Opportunity</p>
                            <h3 className="text-3xl font-black text-white">{safeRender(report.bestOpportunity.name)}</h3>
                        </div>
                        <div className="mt-4 md:mt-0 px-4 py-2 bg-indigo-900/40 rounded-lg border border-indigo-500/30">
                            <p className="text-xs text-indigo-300 font-mono">Market Size: <span className="text-white font-bold">{safeRender(report.bestOpportunity.marketSize)}</span></p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-sm font-bold text-slate-300 uppercase mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                The Pain (Starving Crowd)
                            </h4>
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                                <p className="text-slate-200 font-semibold mb-2">{safeRender(report.bestOpportunity.starvingCrowd)}</p>
                                <p className="text-sm text-slate-400 italic">"{safeRender(report.bestOpportunity.painPoint)}"</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-300 uppercase mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                The 10x AI Multiplier
                            </h4>
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                                <p className="text-cyan-300 font-semibold mb-2">{safeRender(report.aiMultiplierStrategy.coreSolution)}</p>
                                <p className="text-sm text-slate-300">{safeRender(report.aiMultiplierStrategy.the10xMechanism)}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-slate-800/50">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Automation Workflow</h4>
                                <p className="text-sm text-slate-300 font-mono">
                                    {safeRender(report.aiMultiplierStrategy.automationWorkflow)}
                                </p>
                            </div>
                            <button 
                                onClick={handleBuildMVP}
                                className="whitespace-nowrap bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                            >
                                ⚡ Build MVP Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulaic Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Acquisition Formula</h4>
                    <p className="text-sm text-slate-200 font-medium">{safeRender(report.formulaicBreakdown.acquisitionFormula)}</p>
                </div>
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Retention Formula</h4>
                    <p className="text-sm text-slate-200 font-medium">{safeRender(report.formulaicBreakdown.retentionFormula)}</p>
                </div>
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Monetization Formula</h4>
                    <p className="text-sm text-slate-200 font-medium">{safeRender(report.formulaicBreakdown.monetizationFormula)}</p>
                </div>
            </div>

            {generatedCode && (
                <div className="mt-12 bg-slate-950 p-6 rounded-2xl border border-cyan-500/30">
                    <h3 className="text-2xl font-bold text-cyan-300 mb-4">Generated MVP Code</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <pre className="text-slate-300 text-[10px] leading-3 whitespace-pre-wrap font-mono bg-slate-900 p-4 rounded-md h-96 overflow-y-auto border border-slate-800">
                                <code>{generatedCode.generatedCode}</code>
                            </pre>
                        </div>
                        <div className="w-full h-96 bg-white rounded-md border-4 border-slate-800 overflow-hidden">
                            <iframe
                                srcDoc={generatedCode.generatedCode}
                                title="MVP Preview"
                                className="w-full h-full border-0"
                                sandbox="allow-scripts allow-forms"
                            />
                        </div>
                    </div>
                </div>
            )}

            <Methodology models={report.methodology} />
        </div>
    );
};
