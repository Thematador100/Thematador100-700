
import React from 'react';

const ToolLink: React.FC<{ name: string; url: string; useCase: string; color: string }> = ({ name, url, useCase, color }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`block p-3 rounded-lg border border-slate-700 bg-slate-900/50 hover:border-${color}-500 transition-all group`}>
        <div className="flex justify-between items-center">
            <span className={`font-bold text-${color}-400 group-hover:text-${color}-300`}>{name}</span>
            <span className="text-slate-500 text-xs">↗</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">{useCase}</p>
    </a>
);

const HowToFindLeadsGuide: React.FC = () => {
  return (
    <div className="bg-slate-900/50 rounded-xl border border-blue-500/50 shadow-2xl p-6 -mt-4 mb-12 animate-fade-in">
      <h2 className="text-2xl font-bold text-blue-300">Action Plan: From Archetype to Contact Info</h2>
      <p className="text-slate-400 mt-2 mb-6">Stop overpaying for generic lists. Use the "Lookalike Archetypes" above as your search filter, then extract contact info using these cost-effective, high-fidelity data sources.</p>
      
      <div className="space-y-8">
        {/* Phase 1: Search */}
        <div className="flex items-start">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white mr-4">1</div>
          <div>
            <h3 className="font-semibold text-slate-200">Execute the Search</h3>
            <p className="text-slate-400 text-sm">Use the <strong className="text-teal-300">"Execute Search"</strong> buttons on the cards above. This runs a targeted query on LinkedIn or Google to find real people who match the AI's archetype.</p>
          </div>
        </div>

        {/* Phase 2: Enrich */}
        <div className="flex items-start">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white mr-4">2</div>
          <div className="w-full">
            <h3 className="font-semibold text-slate-200">Enrich & Skip Trace (The Professional Stack)</h3>
            <p className="text-slate-400 text-sm mb-4">Once you have a name or address, use these specific tools to get verified emails and phone numbers for pennies on the dollar compared to enterprise tools.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ToolLink 
                    name="PropertyRadar" 
                    url="https://www.propertyradar.com" 
                    useCase="Best for: Real Estate Owners & Equity Data"
                    color="green"
                />
                <ToolLink 
                    name="BatchLeads.io" 
                    url="https://batchleads.io" 
                    useCase="Best for: High-Volume SMS & Skip Tracing"
                    color="blue"
                />
                <ToolLink 
                    name="Melissa Data" 
                    url="https://www.melissadata.com" 
                    useCase="Best for: Identity Verification & Cleaning"
                    color="yellow"
                />
                 <ToolLink 
                    name="OSINT Framework" 
                    url="https://osintframework.com" 
                    useCase="Best for: Deep Background & Social Graph"
                    color="red"
                />
            </div>
          </div>
        </div>

        {/* Phase 3: Outreach */}
        <div className="flex items-start">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-600 flex items-center justify-center font-bold text-white mr-4">3</div>
          <div>
            <h3 className="font-semibold text-slate-200">Scale with Automation</h3>
            <p className="text-slate-400 text-sm">For massive scale, take the <strong className="text-teal-300">Google Dork Query</strong> from the cards above and plug it into a scraper like <strong>Apify</strong>. Then, upload that CSV directly into <strong>BatchLeads</strong> or <strong>Melissa Data</strong> to bulk-append phone numbers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToFindLeadsGuide;
