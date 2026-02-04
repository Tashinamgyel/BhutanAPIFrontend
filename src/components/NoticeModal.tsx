import { useState, useEffect } from 'react';
import { AlertTriangle, Construction, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

export function NoticeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenNotice = localStorage.getItem('bhutan-api-notice-seen');
    if (!hasSeenNotice) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('bhutan-api-notice-seen', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg bg-card border-white/10 p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-orange-500/20 to-amber-500/10 p-6 pb-4">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Construction className="w-7 h-7 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">API Under Development</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-orange-400">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 pt-4 space-y-5">
          <DialogDescription className="text-muted-foreground text-base leading-relaxed">
            The Bhutan API is currently in active development. Some endpoints may not be 
            fully functional or may return sample data. We appreciate your patience as we 
            continue to improve and expand the API.
          </DialogDescription>
          
          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <p className="font-semibold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              What to expect
            </p>
            <ul className="space-y-2.5">
              {[
                'Some endpoints may return mock data',
                'Response formats may change',
                'New endpoints will be added regularly',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <Button
            onClick={handleDismiss}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-6 rounded-xl"
          >
            Got it, thanks!
          </Button>
          
          <p className="text-xs text-center text-muted-foreground/60">
            This notice won't be shown again
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
