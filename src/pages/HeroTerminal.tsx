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
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            Lean Studio
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
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