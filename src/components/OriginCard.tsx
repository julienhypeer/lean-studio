import { motion } from 'framer-motion';
import { Lightbulb, MapPin, Clock } from 'lucide-react';

interface OriginStory {
  problem: string;
  trigger: string;
  vision: string;
  location?: string;
  date?: string;
  moment?: string;
}

interface OriginCardProps {
  projectName: string;
  origin: OriginStory;
}

export default function OriginCard({ projectName, origin }: OriginCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200/50 rounded-xl p-5 mb-6 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-2xl -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-300/10 to-orange-300/10 rounded-full blur-xl translate-y-12 -translate-x-12" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <span className="text-xl">✨</span>
              L'Étincelle
            </h3>
            <p className="text-sm text-amber-700">Comment {projectName} est né</p>
          </div>
        </div>

        {/* Origin Story */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs">💡</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">L'Idée</p>
              <p className="text-sm text-slate-700 line-clamp-3">{origin.problem}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs">🎯</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">La Vision</p>
              <p className="text-sm text-slate-700 line-clamp-3">{origin.vision}</p>
            </div>
          </div>
        </div>

        {/* Context info */}
        {(origin.location || origin.date || origin.moment) && (
          <div className="mt-4 pt-4 border-t border-amber-200/50">
            <div className="flex items-center gap-4 text-xs text-amber-700">
              {origin.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{origin.location}</span>
                </div>
              )}
              {origin.date && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{origin.date}</span>
                </div>
              )}
              {origin.moment && (
                <div className="flex items-center gap-1">
                  <span className="text-amber-600">⏰</span>
                  <span>{origin.moment}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}