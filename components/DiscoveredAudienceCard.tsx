
import React, { useState } from 'react';
import { DiscoveredAudience, B2CDiscoveredAudience, Psychographics, B2CPsychographics } from '../types';

interface DiscoveredAudienceCardProps {
    audience: DiscoveredAudience | B2CDiscoveredAudience;
    index: number;
    analysisType: 'b2b' | 'b2c';
    onMonetize: (audience: DiscoveredAudience | B2CDiscoveredAudience) => void;
    activeAudienceName: string | null | undefined;
}

const Methodology: React.FC<{ models: string[] | undefined }> = ({ models }) => {
    if (!Array.isArray(models) || models.length === 0) return null;
    return (
        <div className="mt-4 pt-4 border-t border-slate-700">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Methodology</h4>
            <div className="flex flex-wrap gap-1">
                {models.map(model => (
                    <span key={model} className="text-[10px] text-slate-400 bg-slate-950/50 border border-slate-700 rounded px-1.5 py-0.5">{model}</span>
                ))}
            </div>
        </div>
    );
};

const QuantitativeSnapshot: React.FC<{marketSize?: string, urgency?: string}> = ({ marketSize, urgency}) => {
    if (!marketSize && !urgency) return null;
    
    const urgencyColor = {
        'High': 'text-red-400',
        'Medium': 'text-yellow-400',
        'Low': 'text-green-400',
    }[urgency || ''] || 'text-slate-300';

    return (
        <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-2 text-center">
            {marketSize && (
                <div className="bg-slate-900/50 p-2 rounded">
                    <p className="text-xs text-slate-400 font-semibold uppercase">Market Size</p>
                    <p className="text-sm font-bold text-amber-300">{marketSize}</p>
                </div>
            )}
            {urgency && (
                <div className="bg-slate-900/50 p-2 rounded">
                    <p className="text-xs text-slate-400 font-semibold uppercase">Urgency</p>
                    <p className={`text-sm font-bold ${urgencyColor}`}>{urgency}</p>
                </div>
            )}
        </div>
    );
};


const DiscoveredAudienceCard: React.FC<DiscoveredAudienceCardProps> = ({ audience, index, analysisType, onMonetize, activeAudienceName }) => {
    const [isMonetizing, setIsMonetizing] = useState(false);
    const [motivationsExpanded, setMotivationsExpanded] = useState(false);
    
    const isActive = audience?.audienceName === activeAudienceName;

    const handleMonetizeClick = () => {
        setIsMonetizing(true);
        onMonetize(audience);
    };

    const isB2B = analysisType === 'b2b';
    const psychographics = audience?.psychographics as Psychographics | B2CPsychographics;

  return (
    <div id={`discovered-audience-card-${index}`} className={`bg-slate-800/70 rounded-xl border ${isActive ? 'border-teal-500' : 'border-slate-700'} shadow-2xl p-6 flex flex-col space-y-4 h-full transition-colors`}>
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-teal-300">{audience?.audienceName || 'Discovered Segment'}</h3>
        <p className="text-slate-400 mt-2 text-sm">{audience?.summary || 'No summary provided.'}</p>
      </div>

      <QuantitativeSnapshot marketSize={audience?.marketSizeEstimate} urgency={audience?.urgencyLevel} />

       <div className="pt-4 border-t border-slate-700">
        <h4 className="font-semibold text-slate-200 mb-2 text-sm">Quantitative Model</h4>
        <p className="text-xs text-slate-400 mb-2">A causal model to predict adoption probability.</p>
        <pre className="text-teal-300 text-xs whitespace-pre-wrap font-mono bg-slate-950 p-2 rounded-md">
            <code>{audience?.quantitativeModel?.decisionScoreFormula || 'N/A'}</code>
        </pre>
      </div>
      
      <div className="pt-4 border-t border-slate-700 space-y-4">
        <div>
            <h4 className="font-semibold text-blue-400 mb-2 text-sm">Demographics</h4>
             <ul className="text-xs text-slate-300 space-y-1">
                <li><strong>Age:</strong> {audience?.demographics?.ageRange || 'N/A'}</li>
                <li><strong>Income:</strong> {audience?.demographics?.incomeLevel || 'N/A'}</li>
                <li><strong>Locations:</strong> {Array.isArray(audience?.demographics?.commonLocations) ? audience.demographics.commonLocations.join(', ') : 'N/A'}</li>
            </ul>
        </div>

        {isB2B && psychographics && 'motivations' in psychographics && Array.isArray(psychographics.motivations) && (
            <div>
                <button onClick={() => setMotivationsExpanded(!motivationsExpanded)} className="w-full text-left font-semibold text-blue-400 mb-2 text-sm flex justify-between items-center">
                    <span>Psychological Drivers</span>
                    <span className="transform transition-transform">{motivationsExpanded ? '▲' : '▼'}</span>
                </button>
                {motivationsExpanded && (
                    <div className="space-y-2 animate-fade-in">
                        {psychographics.motivations.map((m, i) => (
                            <div key={i} className="bg-slate-900/50 p-2 rounded-lg border border-slate-700">
                                <p className="font-bold text-blue-400 text-xs">{m?.driver || 'Driver'}</p>
                                <p className="text-slate-400 text-xs mt-1">{m?.description}</p>
                                <p className="text-slate-300 text-xs mt-2 pt-2 border-t border-slate-700">
                                    <strong className="text-slate-400">Purchasing Implication:</strong> {m?.purchasingImplication}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}

        {isB2B && psychographics && 'dataSignals' in psychographics && Array.isArray(psychographics.dataSignals) && (
             <div>
                <h4 className="font-semibold text-blue-400 mb-2 text-sm">Actionable Data Signals</h4>
                 <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  {psychographics.dataSignals.map(p => <li key={p}>{p}</li>)}
                </ul>
            </div>
        )}
        
        {!isB2B && psychographics && 'mediaConsumptionHabits' in psychographics && Array.isArray(psychographics.mediaConsumptionHabits) && (
             <div>
                <h4 className="font-semibold text-blue-400 mb-2 text-sm">Media Consumption</h4>
                 <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  {psychographics.mediaConsumptionHabits.map(p => <li key={p}>{p}</li>)}
                </ul>
            </div>
        )}

         <div>
            <h4 className="font-semibold text-blue-400 mb-2 text-sm">Buying Triggers & Intent Signals</h4>
             <div className="space-y-2">
                {Array.isArray('buyingTriggers' in (psychographics || {}) ? (psychographics as Psychographics)?.buyingTriggers : (psychographics as B2CPsychographics)?.b2cBuyingTriggers) ? 
                    (('buyingTriggers' in (psychographics || {}) ? (psychographics as Psychographics)?.buyingTriggers : (psychographics as B2CPsychographics)?.b2cBuyingTriggers) as any[]).map((t, i) => (
                        <div key={i} className="bg-slate-900/50 p-2 rounded-lg border border-slate-700">
                           <p className="font-bold text-teal-400 text-xs">{t?.trigger || 'Trigger'}</p>
                           <p className="text-slate-400 text-xs mt-1 italic">{t?.implication}</p>
                        </div>
                    )) : null
                }
             </div>
        </div>
        <Methodology models={audience?.methodology} />
      </div>
      <div className="pt-4 border-t border-slate-700 no-print">
        <button
          onClick={handleMonetizeClick}
          disabled={isMonetizing || !audience}
          className="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition duration-200 text-sm"
        >
          {isMonetizing ? 'Generating...' : 'Generate Monetization Strategy'}
        </button>
      </div>
    </div>
  );
};

export default DiscoveredAudienceCard;
