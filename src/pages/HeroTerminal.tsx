import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
    "};"
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
        {/* Code Display */}
        <div className="relative w-full max-w-4xl mx-auto mb-8">
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
        </div>

        {/* Tagline and CTA */}
        <div className={`text-center transition-all duration-700 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lean Studio
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            4 startups lancées, 1 exit réussi, des leçons invaluables
          </p>
          <button
            onClick={handleExplore}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Explorer le Portfolio
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AuroraBackground>
  );
}