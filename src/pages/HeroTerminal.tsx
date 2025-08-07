import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Terminal, Zap } from 'lucide-react';
import TypewriterLine from '../components/TypewriterLine';

export default function HeroTerminal() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [lineCompleted, setLineCompleted] = useState<number[]>([]);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);

  const codeLines = [
    "const leanStudio = {",
    "  methodology: 'Lean Startup',",
    "  philosophy: 'Build → Measure → Learn',",
    "  businesses: [",
    "    { name: 'NoCodeur', status: 'active', mrr: 12500 },",
    "    { name: 'EcoDeliver', status: 'pivoted', users: 15000 },",
    "    { name: 'FitTracker', status: 'sold', exit: 450000 },",
    "    { name: 'LocalChef', status: 'closed', learning: 'invaluable' }",
    "  ],",
    "  trackRecord: {",
    "    totalRevenue: '€285K',",
    "    totalUsers: '45K+',",
    "    successRate: '75%',",
    "    exits: 1",
    "  }",
    "};",
    "",
    "console.log('Building the future, one startup at a time...');"
  ];

  // Handle line completion
  const handleLineComplete = (index: number) => {
    setLineCompleted(prev => [...prev, index]);
    // Move to next line
    if (index < codeLines.length - 1) {
      setCurrentTypingIndex(index + 1);
    }
  };

  // Show button after all lines are typed
  useEffect(() => {
    if (lineCompleted.length === codeLines.length) {
      setTimeout(() => setShowButton(true), 500);
    }
  }, [lineCompleted.length, codeLines.length]);

  const handleExplore = () => {
    navigate('/portfolio', { state: { animate: true } });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Simple grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-8">
        {/* Terminal Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-8 h-8 text-green-400" />
            <span className="text-green-400 font-mono text-xl">lean-studio</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent"></div>
        </div>

        {/* Code Editor */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 shadow-2xl">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm font-mono">portfolio.js</span>
              <span className="text-gray-600 text-xs">JavaScript</span>
            </div>
          </div>

          {/* Code Content */}
          <div className="p-6 font-mono text-sm">
            {codeLines.map((line, index) => (
              <TypewriterLine
                key={index}
                text={line}
                delay={index * 150}
                onComplete={() => handleLineComplete(index)}
                index={index}
                currentTypingIndex={currentTypingIndex}
              />
            ))}
          </div>
        </div>

        {/* Terminal Output */}
        {lineCompleted.length === codeLines.length && (
          <div className="mt-6 bg-black/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4 animate-fadeIn">
            <div className="flex items-start gap-2 font-mono text-sm">
              <span className="text-green-400">❯</span>
              <span className="text-gray-300">Building the future, one startup at a time...</span>
              <span className="inline-block w-2 h-4 bg-green-400 animate-blink ml-1"></span>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className={`mt-12 text-center transition-all duration-700 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={handleExplore}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Zap className="w-5 h-5" />
            <span>Explorer le Portfolio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            
            {/* Button glow effect */}
            <div className="absolute inset-0 rounded-lg bg-primary-400/30 blur-xl -z-10 group-hover:bg-primary-400/40 transition-all"></div>
          </button>
          
          <p className="mt-4 text-gray-500 text-sm">
            Découvrez {codeLines.filter(l => l.includes('name:')).length} projets entrepreneuriaux
          </p>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </div>
  );
}