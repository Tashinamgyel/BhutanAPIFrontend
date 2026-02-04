import { Copy, Check, Sparkles, Zap, Globe } from 'lucide-react';
import { useState } from 'react';
import { API_BASE_URL } from '@/types/api';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const defaultUrl = `${API_BASE_URL}/details`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`curl ${defaultUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    { icon: Zap, text: 'Lightning Fast' },
    { icon: Globe, text: 'RESTful API' },
    { icon: Sparkles, text: 'No Auth Required' },
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 radial-gradient pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge 
            variant="secondary" 
            className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-4 py-1.5 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Now Available
          </Badge>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-white">Discover </span>
          <span className="gradient-text">Bhutan</span>
          <br />
          <span className="text-white">Through Data</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
          Access comprehensive information about Bhutan's administrative divisions, 
          cultural heritage, and the unique Gross National Happiness framework through 
          our modern REST API.
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-muted-foreground"
            >
              <feature.icon className="w-4 h-4 text-orange-400" />
              {feature.text}
            </div>
          ))}
        </div>

        {/* Code snippet */}
        <div className="inline-flex items-center gap-3 px-5 py-3 glass-card rounded-xl group hover:border-orange-500/30 transition-all duration-300">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <code className="text-sm text-muted-foreground font-mono">
            curl <span className="text-orange-400">{defaultUrl}</span>
          </code>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
