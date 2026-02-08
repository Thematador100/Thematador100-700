
import React from 'react';

interface LandingPageProps {
    onEnterApp: () => void;
}

const FeatureCard: React.FC<{ title: string; description: string; icon: string }> = ({ title, description, icon }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center transform hover:scale-105 hover:border-blue-500 transition-all duration-300">
        <div className="text-4xl mb-4 text-amber-400">{icon}</div>
        <h3 className="text-lg font-bold text-slate-100">{title}</h3>
        <p className="text-slate-400 text-sm mt-2">{description}</p>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
            <main className="container mx-auto px-4 py-12 sm:py-24">
                {/* Hero Section */}
                <section className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 leading-tight">
                        Go from Insight to Income in Minutes.
                        <br/>
                        <span className="bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Not Months.</span>
                    </h1>
                    {/* 
                        Alternative Headlines:

                        Option 2:
                        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 leading-tight">
                            Your Next High-Value Prospect, Discovered in 90 Seconds.
                            <br/>
                            <span className="bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Let AI Find Your "Bleeding Neck" Problems.</span>
                        </h1>

                        Option 3:
                        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 leading-tight">
                            Architect Your Next AI Venture Before Lunch.
                            <br/>
                            <span className="bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Go From Concept to Code with AI-Powered Speed.</span>
                        </h1>
                    */}
                    <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
                        This is your personal AI business strategist. Instantly discover monetizable pain, generate a complete business model to solve it, and deploy an AI workforce to execute your plan.
                    </p>
                    <button 
                        onClick={onEnterApp}
                        className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold py-4 px-8 rounded-lg text-lg hover:from-blue-700 hover:to-indigo-600 transition duration-200 shadow-lg"
                    >
                        Launch AudienceAI & Find Your Starving Crowd
                    </button>
                </section>

                {/* Problem Section */}
                <section className="mt-24 sm:mt-32 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-100">You're Stuck in the "Convincing" Business</h2>
                    <p className="mt-4 text-slate-400">
                        You're burning cash on ads trying to create demand, fighting over saturated markets, and guessing what people want. The traditional way is a slow, expensive grind with no guarantee of success.
                    </p>
                </section>
                
                {/* Solution / Features Section */}
                <section className="mt-24 sm:mt-32 max-w-5xl mx-auto">
                     <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                        We Give You An Unfair Advantage
                     </h2>
                     <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard 
                            icon="🔥"
                            title="Find Monetizable Pain"
                            description="Our 'Aspirin Finder' protocol identifies 'starving crowds' with 'hair-on-fire' problems and builds the entire AI-powered business model to solve it for them."
                        />
                         <FeatureCard 
                            icon="🏗️"
                            title="Generate AI Solutions"
                            description="Turn the solution into a real-world asset. The AI can architect the venture, build a micro-tool to generate leads, and even write the code for you."
                        />
                        <FeatureCard 
                            icon="👑"
                            title="Deploy Dominance Blueprints"
                            description="Once you have your solution, generate a complete, investment-grade plan for absolute market domination, from asymmetric strategy to your first 100 customers."
                        />
                         <FeatureCard 
                            icon="🤖"
                            title="Launch Your AI Workforce"
                            description="Deploy a team of autonomous AI agents from any report to begin executing the strategy immediately in the Command Center."
                        />
                     </div>
                </section>
                
                 {/* Final CTA */}
                <section className="mt-24 sm:mt-32 text-center max-w-3xl mx-auto">
                     <h2 className="text-4xl font-bold text-slate-100">
                        Your Unfair Advantage Is Here.
                     </h2>
                     <button 
                        onClick={onEnterApp}
                        className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold py-4 px-8 rounded-lg text-lg hover:from-blue-700 hover:to-indigo-600 transition duration-200 shadow-lg"
                    >
                        Launch AudienceAI Now
                    </button>
                </section>
            </main>

            <footer className="text-center py-6 text-slate-500 text-sm">
                AudienceAI Predictive Prospecting Engine
            </footer>
        </div>
    );
}

export default LandingPage;
