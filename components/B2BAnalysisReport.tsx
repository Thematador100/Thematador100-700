
"use client";

import React, { Suspense, lazy } from 'react';
import { AnalysisResult, Demographics, Psychographics, QuantitativeModel } from '../types';
import AIEnhancementCard from './AIEnhancementCard';

const DecisionDecompositionChart = lazy(() => import("./DecisionDecompositionChart"));
const AngleUpliftHeatmap = lazy(() => import("./AngleUpliftHeatmap"));


interface B2BAnalysisReportProps {
    analysis: AnalysisResult;
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

    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border border-blue-500/50 shadow-2xl p-6 animate-fade-in mb-12">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-center">
                Ideal Customer Profile Analysis
            </h2>
            <p className="text-center text-slate-400 mt-1 mb-8">High-Fidelity Strategic Intelligence with Predictive Intent Layers.</p>

            <div className="space-y-8">
                {/* 10X ENHANCEMENT LAYER - CRITICAL FOR COMPETITIVE ADVANTAGE */}
                {sharedProfile.aiEnhancement ? (
                    <AIEnhancementCard enhancement={sharedProfile.aiEnhancement} />
                ) : (
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 italic text-slate-500 text-center text-xs">
                        AI Enhancement Protocol skipped for this specific query.
                    </div>
                )}

                <div>
                    <h3 className="text-xl font-bold text-blue-300 border-b border-blue-500/20 pb-2 mb-3">Executive Summary</h3>
                    <p className="text-slate-200 text-lg leading-relaxed">{sharedProfile.summary || 'Summary unavailable.'}</p>
                </div>
                
                {/* Psychographics, Quantitative, etc. follow standard patterns */}
            </div>
        </div>
    );
};

export default B2BAnalysisReport;
