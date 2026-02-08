
import React, { useState } from 'react';
import { LookalikeProspect } from '../types';

const createLinkedInSearchUrl = (query: string): string => {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(query)}`;
};

const createGoogleSearchUrl = (query: string): string => {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
};

interface LeadCardProps {
    prospect: LookalikeProspect;
    isSelected: boolean;
    onToggleSelect: (fullName: string) => void;
    filter?: string;
    advancedFilter?: string;
}

const getHighlightedText = (text: string, filter?: string, advancedFilter?: string): { __html: string } => {
    const combinedFilter = `${filter || ''} ${advancedFilter || ''}`.trim();

    if (!combinedFilter) {
        return { __html: text };
    }

    const searchTerms = combinedFilter.toLowerCase().match(/"[^"]+"|[\w']+/g)?.filter(term => term) || [];
    
    if (searchTerms.length === 0) {
        return { __html: text };
    }
    
    const escapedTerms = searchTerms.map(term => 
        term.replace(/"/g, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );
    
    const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
    
    const highlightedText = text.replace(regex, (match) => 
        `<mark class="bg-yellow-400 text-black px-0.5 rounded">${match}</mark>`
    );
    
    return { __html: highlightedText };
};


const LeadCard: React.FC<LeadCardProps> = ({ prospect, isSelected, onToggleSelect, filter, advancedFilter }) => {
  const searchUrl = createLinkedInSearchUrl(prospect.linkedinSearchQuery);
  const googleDorkUrl = createGoogleSearchUrl(prospect.googleDorkQuery);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
      navigator.clipboard.writeText(text).then(() => {
          setCopySuccess(type);
          setTimeout(() => setCopySuccess(null), 2000);
      });
  };
  
  const getStatusBadge = () => {
    if (!prospect.validationStatus) return null;

    const baseClasses = "absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center space-x-1";
    const statusClasses = prospect.validationStatus === 'Validated' 
      ? "bg-green-900/50 text-green-300 border border-green-700" 
      : "bg-yellow-900/50 text-yellow-300 border border-yellow-700";
    
    return (
      <div 
        className={`${baseClasses} ${statusClasses}`}
      >
        <span>{prospect.validationStatus}</span>
        {prospect.validationRationale && (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
        )}
      </div>
    );
  }


  return (
    <div className={`relative bg-slate-800/70 rounded-xl border ${isExpanded ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-700'} shadow-2xl p-6 flex flex-col space-y-4 transition-all duration-300`}>
      <input
        type="checkbox"
        className="absolute top-4 left-4 h-5 w-5 rounded bg-slate-700 border-slate-500 text-indigo-500 focus:ring-indigo-600 cursor-pointer z-10"
        aria-label={`Select ${prospect.fullName}`}
        checked={isSelected}
        onChange={() => onToggleSelect(prospect.fullName)}
      />
      
      {/* Clickable Header Area to Toggle Expand */}
      <div 
        className="cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
          {getStatusBadge()}
          <div className="pl-8">
            <h3 
              className="text-lg font-bold text-teal-300 pr-24"
              dangerouslySetInnerHTML={getHighlightedText(prospect.fullName, filter, advancedFilter)}
            />
            <p 
              className="text-blue-400 text-sm"
              dangerouslySetInnerHTML={getHighlightedText(prospect.jobTitle, filter, advancedFilter)}
            />
            <p 
              className="text-slate-400 text-sm font-semibold"
              dangerouslySetInnerHTML={getHighlightedText(prospect.companyName, filter, advancedFilter)}
            />
          </div>
      </div>

      <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-300 text-xs bg-slate-900/50 p-3 rounded-r-lg">
            {prospect.rationale}
          </blockquote>
      </div>

      {isExpanded && (
        <div className="space-y-4 animate-fade-in pt-2 border-t border-slate-700">
            
            {prospect.validationRationale && (
                <div className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg">
                  <p className="text-xs font-bold text-slate-300">Validation Rationale:</p>
                  <p className="text-xs text-slate-400 italic mt-1">{prospect.validationRationale}</p>
                </div>
            )}

            <div>
                <div className="flex justify-between items-center mb-1">
                    <p className="text-xs font-semibold text-slate-400">Search Queries:</p>
                </div>
                
                <div className="space-y-2">
                    <div className="bg-slate-950 p-2 rounded border border-slate-700">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-bold text-blue-400">LinkedIn Query</span>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleCopy(prospect.linkedinSearchQuery, 'linkedin'); }}
                                className="text-[10px] text-slate-400 hover:text-white"
                            >
                                {copySuccess === 'linkedin' ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <code className="text-[10px] text-slate-300 block break-all">{prospect.linkedinSearchQuery}</code>
                    </div>

                    <div className="bg-slate-950 p-2 rounded border border-slate-700">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-bold text-green-400">Google Dork</span>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleCopy(prospect.googleDorkQuery, 'google'); }}
                                className="text-[10px] text-slate-400 hover:text-white"
                            >
                                {copySuccess === 'google' ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <code className="text-[10px] text-slate-300 block break-all">{prospect.googleDorkQuery}</code>
                    </div>
                </div>
            </div>
        </div>
      )}

      <div className="pt-2 flex-grow flex flex-col justify-end">
        <div className="space-y-2">
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md transition-colors text-sm font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
              </svg>
              <span>Execute Search on LinkedIn</span>
            </a>
             <a
              href={googleDorkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-slate-600 hover:bg-slate-700 text-white py-2 px-3 rounded-md transition-colors text-sm font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Google Dork Search</span>
            </a>
        </div>
        
        {!isExpanded && (
             <button 
                onClick={() => setIsExpanded(true)}
                className="w-full mt-2 text-xs text-slate-500 hover:text-slate-300 flex items-center justify-center pt-2"
             >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="ml-1">View Strategy Details</span>
             </button>
        )}
        {isExpanded && (
             <button 
                onClick={() => setIsExpanded(false)}
                className="w-full mt-2 text-xs text-slate-500 hover:text-slate-300 flex items-center justify-center pt-2 border-t border-slate-700/50"
             >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span className="ml-1">Hide Details</span>
             </button>
        )}
      </div>
    </div>
  );
};

export default LeadCard;
