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
      </div>
    </AuroraBackground>
  );
}