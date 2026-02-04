import { Mountain, Github, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 glass">
      <div className="flex items-center justify-between h-full px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 pulse-glow">
              <Mountain className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">Bhutan API</h1>
              <Badge 
                variant="secondary" 
                className="bg-orange-500/15 text-orange-400 border border-orange-500/25 text-xs font-medium"
              >
                v1.0
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Kingdom of Bhutan Data Platform
            </p>
          </div>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Tashinamgyel"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5"
          >
            <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline font-medium">GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>
        </div>
      </div>
    </header>
  );
}
