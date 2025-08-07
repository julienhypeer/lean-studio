import { useTypewriter } from '../hooks/useTypewriter';

interface TypewriterLineProps {
  text: string;
  delay: number;
  onComplete: () => void;
  index: number;
  currentTypingIndex: number;
}

export default function TypewriterLine({ 
  text, 
  delay, 
  onComplete, 
  index,
  currentTypingIndex 
}: TypewriterLineProps) {
  const { displayText } = useTypewriter(text, {
    speed: 25,
    delay: delay,
    onComplete: onComplete
  });

  // Syntax highlighting
  const highlightSyntax = (text: string) => {
    return text.split(/(\s+|{|}|\[|\]|,|'|:|\d+)/).map((part, partIndex) => {
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
    });
  };

  return (
    <div className="min-h-[1.5em]">
      {highlightSyntax(displayText)}
      {/* Cursor - only show on the line currently being typed */}
      {index === currentTypingIndex && displayText.length < text.length && (
        <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
      )}
    </div>
  );
}