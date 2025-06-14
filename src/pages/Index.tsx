
import React from 'react';
import { EchoSimulator } from '../components/EchoSimulator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-6 shadow-lg">
              <span className="text-3xl font-bold text-white">E</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent mb-4">
              ECHO
            </h1>
            <p className="text-xl text-slate-600 mb-2">
              AI Empathy Simulator
            </p>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Advanced psychological analysis and non-violent communication theory. 
              Illuminate the hidden humanity in conflicts and discover profound insights for meaningful dialogue.
            </p>
          </header>
          
          <EchoSimulator />
        </div>
      </div>
    </div>
  );
};

export default Index;
