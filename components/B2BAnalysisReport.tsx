
"use client";

import React, { Suspense, lazy } from 'react';
import { AnalysisResult, Demographics, Psychographics, QuantitativeModel } from '../types';

const DecisionDecompositionChart = lazy(() => import("./DecisionDecompositionChart"));
const AngleUpliftHeatmap = lazy(() => import("./AngleUpliftHeatmap"));


interface B2BAnalysisReportProps {
    analysis: AnalysisResult;
}

const DemographicsCard: React.FC<{ demographics: Demographics }> = ({ demographics }) => (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
        <h4 className="font-bold text-blue-300">Inferred Demographics</h4>
        <ul className="text-sm text-slate-300 space-y-2 mt-2">
            <li><strong>Age Range:</strong> {demographics?.ageRange || 'N/A'}</li>
            <li><strong>Est. Income Level:</strong> {demographics?.incomeLevel || 'N/A'}</li>
            <li><strong>Common Locations:</strong> {Array.isArray(demographics?.commonLocations) ? demographics.commonLocations.join(', ') : 'N/A'}</li>
        </ul>
    </div>
);

const PsychographicsCard: React.FC<{ psychographics: Psychographics }> = ({ psychographics }) => (
     <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 space-y-4">
        <h4 className="font-bold text-blue-300">Psychographics & Motivations</h4>
        <div>
            <h5 className="text-xs text-slate-400 uppercase font-semibold">Psychological Drivers:</h5>
            <div className="space-y-2 mt-2">
                {(Array.isArray(psychographics?.motivations) ? psychographics.motivations : []).map((m, i) => (
                    <div key={i} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <p className="font-bold text-blue-400 text-sm">{m?.driver || 'Driver'}</p>
                        <p className="text-slate-400 text-xs mt-1">{m?.description}</p>
                        <p className="text-slate-300 text-xs mt-2 pt-2 border-t border-slate-700">
                            <strong className="text-slate-400">Purchasing Implication:</strong> {m?.purchasingImplication}
                        </p>
                    </div>
                ))}
            </div>
        </div>
         <div>
            <h5 className="text-xs text-slate-400 uppercase font-semibold">Actionable Data Signals:</h5>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 mt-2">
                {(Array.isArray(psychographics?.dataSignals) ? psychographics.dataSignals : []).map(signal => <li key={signal}>{signal}</li>)}
            </ul>
        </div>
    </div>
);

const QuantitativeModelReport: React.FC<{ model: QuantitativeModel }> = ({ model }) => (
    <div className="space-y-4">
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <h4 className="font-bold text-blue-300">Decision Score Formula</h4>
            <pre className="text-blue-300 text-sm whitespace-pre-wrap font-mono bg-slate-950 p-3 rounded-md mt-2"><code>{model?.decisionScoreFormula || 'N/A'}</code></pre>
        </div>
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <h4 className="font-bold text-blue-300">Variable Definitions</h4>
            <div className="space-y-2 mt-2">
                {(Array.isArray(model?.variableDefinitions) ? model.variableDefinitions : []).map(v => (
                    <div key={v?.variable} className="text-xs">
                        <code className="font-mono text-slate-300 bg-slate-800 p-1 rounded">{v?.variable}</code>: <span className="text-slate-400">{v?.definition}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);


const EmptyState: React.FC<{ message?: string }> = ({ message = "No data available" }) => {
  return <div className="h-full grid place-items-center text-sm text-slate-500">{message}</div>;
}

const B2BAnalysisReport: React.FC<B2BAnalysisReportProps> = ({ analysis }) => {
    const { sharedProfile } = analysis || {};

    if (!sharedProfile) {
        return (
            <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border border-red-500/50 p-6 text-center text-red-200">
                Strategic Intelligence generated but formatting was incomplete. Please refine your inputs and try again.
            </div>
        );
    }

    const barData = (Array.isArray(sharedProfile.dataVisualizationSuite?.decisionDecomposition) ? sharedProfile.dataVisualizationSuite.decisionDecomposition : [])
        .map(d => ({ label: d?.label ?? "—", value: Number(d?.value ?? 0) }))
        .filter(d => Number.isFinite(d.value));

    const heatData = (Array.isArray(sharedProfile.dataVisualizationSuite?.angleUplift) ? sharedProfile.dataVisualizationSuite.angleUplift : [])
        .map(c => ({
            segment: c?.segment ?? "Unknown",
            angle: c?.angle ?? "Unknown",
            uplift: Number(c?.uplift ?? 0)
        }))
        .filter(c => Number.isFinite(c.uplift));

    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border border-blue-500/50 shadow-2xl p-6 animate-fade-in mb-12">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-center">
                Ideal Customer Profile Analysis
            </h2>
            <p className="text-center text-slate-400 mt-1 mb-8">Restored High-Fidelity Strategic Intelligence.</p>

            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-blue-300 border-b border-blue-500/20 pb-2 mb-3">Executive Summary</h3>
                    <p className="text-slate-200 text-lg leading-relaxed">{sharedProfile.summary || 'Summary unavailable.'}</p>
                </div>

                <div className="pt-6 border-t border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-200 mb-4">Quantitative Model & Core Hypothesis</h3>
                    <QuantitativeModelReport model={sharedProfile.quantitativeModel} />
                </div>
                
                 <div className="pt-6 border-t border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-200 mb-4">Data Visualizations</h3>
                     <div className="space-y-6">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                             <h4 className="font-bold text-blue-300 mb-2">Decision Decomposition</h4>
                             <div className="w-full h-72 md:h-96">
                                <Suspense fallback={<EmptyState message="Loading Chart..." />}>
                                    {barData.length > 0 ? <DecisionDecompositionChart data={barData} /> : <EmptyState />}
                                </Suspense>
                             </div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                             <h4 className="font-bold text-blue-300 mb-2">Angle Uplift by Emotion</h4>
                             <div className="w-full h-72 md:h-96">
                                <Suspense fallback={<EmptyState message="Loading Heatmap..." />}>
                                     {heatData.length > 0 ? <AngleUpliftHeatmap data={heatData} /> : <EmptyState />}
                                 </Suspense>
                             </div>
                        </div>
                    </div>
                </div>


                <div className="pt-6 border-t border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DemographicsCard demographics={sharedProfile.demographics} />
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                         <h4 className="font-bold text-blue-300">Professional Profile</h4>
                         <ul className="text-sm text-slate-300 space-y-2 mt-2">
                             <li><strong>Industries:</strong> {Array.isArray(sharedProfile.commonIndustries) ? sharedProfile.commonIndustries.join(', ') : 'N/A'}</li>
                             <li><strong>Job Functions:</strong> {Array.isArray(sharedProfile.commonJobFunctions) ? sharedProfile.commonJobFunctions.join(', ') : 'N/A'}</li>
                             <li><strong>Company Sizes:</strong> {Array.isArray(sharedProfile.commonCompanySizes) ? sharedProfile.commonCompanySizes.join(', ') : 'N/A'}</li>
                         </ul>
                    </div>
                </div>
                
                <div className="pt-6 border-t border-slate-700">
                     <PsychographicsCard psychographics={sharedProfile.psychographics} />
                </div>
            </div>
        </div>
    );
};

export default B2BAnalysisReport;
