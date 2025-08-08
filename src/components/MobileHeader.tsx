import { Menu, X, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
  currentBusinessName?: string;
}

export default function MobileHeader({ isOpen, onToggle, currentBusinessName }: MobileHeaderProps) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 z-40 px-4 flex items-center justify-between">
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-accent rounded-lg flex items-center justify-center">
          <Briefcase className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-white">Lean Studio</h1>
          {currentBusinessName && (
            <p className="text-xs text-slate-400">{currentBusinessName}</p>
          )}
        </div>
      </div>

      {/* Menu Button */}
      <button
        onClick={onToggle}
        className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}