import { Mountain, Heart, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gradient-to-b from-card to-background mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600">
              <Mountain className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">Bhutan API</span>
              <span className="text-sm text-muted-foreground">
                Powered by the Kingdom of Bhutan
              </span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6">
            <a
              href="#documentation"
              className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Documentation
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#support"
              className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Support
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#terms"
              className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Terms
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </nav>

          {/* Credits */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Crafted with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="text-muted-foreground">by</span>
            <a
              href="https://www.tashinamgyel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 text-orange-400 hover:text-orange-300 font-medium transition-colors"
            >
              Tashi Namgyel
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Bhutan API. All rights reserved. Data provided for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
