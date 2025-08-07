import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Terminal, Zap } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

export default function HeroTerminal() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [lineCompleted, setLineCompleted] = useState<number[]>([]);

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

  // Typewriter for each line with staggered delays
  const typedLines = codeLines.map((line, index) => {
    const delay = index * 150; // Stagger each line by 150ms
    const { displayText, isComplete } = useTypewriter(line, {
      speed: 25,
      delay: delay,
      onComplete: () => {
        setLineCompleted(prev => [...prev, index]);
      }
    });
    return displayText;
  });

  // Show button after all lines are typed
  useEffect(() => {
    if (lineCompleted.length === codeLines.length) {
      setTimeout(() => setShowButton(true), 500);
    }
  }, [lineCompleted.length, codeLines.length]);

  const handleExplore = () => {
    // Navigate to portfolio with animation state
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

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5" opacity="0.05"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)"/%3E%3C/svg%3E')] opacity-20"></div>

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
            {typedLines.map((line, index) => (
              <div key={index} className="min-h-[1.5em]">
                {line.split(/(\s+|{|}|\[|\]|,|'|:|\d+)/).map((part, partIndex) => {
                  // Syntax highlighting
                  let className = "text-gray-300";
                  if (part === 'const' || part === 'console' || part === 'log') {
                    className = "text-purple-400";
                  } else if (part.startsWith("'") || part === "'") {
                    className = "text-green-400";
                  } else if (/^\d+/.test(part)) {
                    className = "text-orange-400";
                  } else if (part === '{' || part === '}' || part === '[' || part === ']') {
                    className = "text-yellow-400";
                  } else if (part === ':' || part === ',') {
                    className = "text-gray-500";
                  } else if (['methodology', 'philosophy', 'businesses', 'trackRecord', 'name', 'status', 'mrr', 'users', 'exit', 'learning', 'totalRevenue', 'totalUsers', 'successRate', 'exits'].includes(part)) {
                    className = "text-blue-400";
                  }
                  
                  return (
                    <span key={partIndex} className={className}>
                      {part}
                    </span>
                  );
                })}
                {/* Cursor */}
                {index === lineCompleted.length && index < codeLines.length && (
                  <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
                )}
              </div>
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