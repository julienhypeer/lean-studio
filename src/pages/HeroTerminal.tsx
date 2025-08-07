import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AuroraBackground } from '../components/AuroraBackground';
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
    <AuroraBackground>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Portfolio Entrepreneurial</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
            Lean Studio
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez mon parcours à travers la méthodologie Lean Startup
          </p>
        </div>

        {/* Code Display */}
        <div className="relative w-full max-w-4xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Window Header */}
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-sm text-gray-500 font-mono">portfolio.js</span>
            </div>

            {/* Code Content */}
            <div className="p-8 font-mono text-sm md:text-base">
              {codeLines.map((line, index) => (
                <TypewriterLine
                  key={index}
                  text={line}
                  delay={index * 100}
                  onComplete={() => handleLineComplete(index)}
                  index={index}
                  currentTypingIndex={currentTypingIndex}
                />
              ))}
            </div>
          </div>

          {/* Output Terminal */}
          {lineCompleted.length === codeLines.length && (
            <div className="mt-4 bg-gray-900/90 backdrop-blur-sm text-green-400 p-4 rounded-lg font-mono text-sm animate-fadeIn">
              <span className="text-gray-500">❯</span> Building the future, one startup at a time...
              <span className="inline-block w-2 h-4 bg-green-400 animate-blink ml-1"></span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className={`transition-all duration-700 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={handleExplore}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="text-lg">Explorer le Portfolio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="text-center">
              <div className="font-bold text-2xl text-gray-900">4</div>
              <div>Startups lancées</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="font-bold text-2xl text-gray-900">€285K</div>
              <div>Revenue généré</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="font-bold text-2xl text-gray-900">45K+</div>
              <div>Utilisateurs</div>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}