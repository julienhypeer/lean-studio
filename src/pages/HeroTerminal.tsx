import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AuroraBackground } from '../components/AuroraBackground';

export default function HeroTerminal() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/portfolio', { state: { animate: true } });
  };

  return (
    <AuroraBackground>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center animate-fadeIn">
          <h1 className="text-6xl md:text-7xl font-bold text-black mb-6">
            Lean Studio
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto">
            4 startups lancées, 1 exit réussi, des leçons invaluables
          </p>
          <button
            onClick={handleExplore}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Explorer le Portfolio
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Logo Carousel */}
        <div className="mt-20 w-full max-w-6xl mx-auto">
          <div className="relative overflow-hidden">
            <div className="flex space-x-16 animate-carousel">
              {/* Premier set de logos */}
              <div className="flex space-x-16 shrink-0">
                <div className="flex items-center justify-center w-32 h-16">
                  <span className="text-4xl grayscale opacity-60 hover:opacity-100 transition-opacity">🚀</span>
                  <span className="ml-2 text-gray-600 font-semibold">NoCodeur</span>
                </div>
                <div className="flex items-center justify-center w-32 h-16">
                  <span className="text-4xl grayscale opacity-60 hover:opacity-100 transition-opacity">🌱</span>
                  <span className="ml-2 text-gray-600 font-semibold">EcoDeliver</span>
                </div>
                <div className="flex items-center justify-center w-32 h-16">
                  <span className="text-4xl grayscale opacity-60 hover:opacity-100 transition-opacity">💪</span>
                  <span className="ml-2 text-gray-600 font-semibold">FitTracker</span>
                </div>
                <div className="flex items-center justify-center w-32 h-16">
                  <span className="text-4xl grayscale opacity-60 hover:opacity-100 transition-opacity">👨‍🍳</span>
                  <span className="ml-2 text-gray-600 font-semibold">LocalChef</span>
                </div>
                <div className="flex items-center justify-center w-32 h-16">
                  <span className="text-4xl grayscale opacity-60 hover:opacity-100 transition-opacity">📊</span>
                  <span className="ml-2 text-gray-600 font-semibold">DataBoost</span>
                </div>
                <div className="flex items-center justify-center w-32 h-16">
                  <span className="text-4xl grayscale opacity-60 hover:opacity-100 transition-opacity">🎯</span>
                  <span className="ml-2 text-gray-600 font-semibold">TargetAI</span>
                </div>
              </div>
              {/* Deuxième set de logos (duplication pour l'effet infini) */}
              <div className="flex space-x-16 shrink-0">
                <div className="flex items-center justify-center w-32 h-16">
                  <span className="text-4xl grayscale opacity-60 hover:opacity-100 transition-opacity">🚀</span>
                  <span className="ml-2 text-gray-600 font-semibold">NoCodeur</span>
                </div>
                <div className="flex items-center justify-center w-32 h-16">
                  <span className="text-4xl grayscale opacity-60 hover:opacity-100 transition-opacity">🌱</span>
                  <span className="ml-2 text-gray-600 font-semibold">EcoDeliver</span>
                </div>
                <div className="flex items-center justify-center w-32 h-16">
                  <span className="text-4xl grayscale opacity-60 hover:opacity-100 transition-opacity">💪</span>
                  <span className="ml-2 text-gray-600 font-semibold">FitTracker</span>
                </div>
                <div className="flex items-center justify-center w-32 h-16">
                  <span className="text-4xl grayscale opacity-60 hover:opacity-100 transition-opacity">👨‍🍳</span>
                  <span className="ml-2 text-gray-600 font-semibold">LocalChef</span>
                </div>
                <div className="flex items-center justify-center w-32 h-16">
                  <span className="text-4xl grayscale opacity-60 hover:opacity-100 transition-opacity">📊</span>
                  <span className="ml-2 text-gray-600 font-semibold">DataBoost</span>
                </div>
                <div className="flex items-center justify-center w-32 h-16">
                  <span className="text-4xl grayscale opacity-60 hover:opacity-100 transition-opacity">🎯</span>
                  <span className="ml-2 text-gray-600 font-semibold">TargetAI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}