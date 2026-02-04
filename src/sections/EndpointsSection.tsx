import { useRef, useEffect } from 'react';
import { Crown, Heart, MapPin, Mountain, Building, Globe, ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { endpointCategories } from '@/types/api';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  crown: Crown,
  heart: Heart,
  mapPin: MapPin,
  mountain: Mountain,
  building: Building,
  globe: Globe,
};

const categoryColors: Record<string, { bg: string; border: string; icon: string }> = {
  majesties: { bg: 'from-amber-500/10 to-orange-500/5', border: 'border-amber-500/20', icon: 'text-amber-400' },
  gnh: { bg: 'from-rose-500/10 to-pink-500/5', border: 'border-rose-500/20', icon: 'text-rose-400' },
  dzongkhags: { bg: 'from-emerald-500/10 to-teal-500/5', border: 'border-emerald-500/20', icon: 'text-emerald-400' },
  gewogs: { bg: 'from-blue-500/10 to-cyan-500/5', border: 'border-blue-500/20', icon: 'text-blue-400' },
  dzongs: { bg: 'from-violet-500/10 to-purple-500/5', border: 'border-violet-500/20', icon: 'text-violet-400' },
  general: { bg: 'from-orange-500/10 to-amber-500/5', border: 'border-orange-500/20', icon: 'text-orange-400' },
};

interface EndpointsSectionProps {
  activeSection: string;
  onTryEndpoint: (url: string) => void;
}

export function EndpointsSection({ activeSection, onTryEndpoint }: EndpointsSectionProps) {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (activeSection && sectionRefs.current[activeSection]) {
      sectionRefs.current[activeSection]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [activeSection]);

  return (
    <section className="py-12">
      {/* Section Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
            <ExternalLink className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">API Endpoints</h2>
            <p className="text-muted-foreground">
              Explore all available endpoints organized by category
            </p>
          </div>
        </div>
      </div>

      {/* Endpoint Cards */}
      <div className="space-y-8">
        {endpointCategories.map((category) => {
          const Icon = iconMap[category.icon];
          const colors = categoryColors[category.id] || categoryColors.general;
          
          return (
            <div
              key={category.id}
              ref={(el) => { sectionRefs.current[category.id] = el; }}
              id={category.id}
              className="group scroll-mt-28"
            >
              <div className="glass-card rounded-2xl overflow-hidden hover-lift gradient-border">
                {/* Category Header */}
                <div className={`p-6 bg-gradient-to-r ${colors.bg} border-b ${colors.border}`}>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 ${colors.icon}`}>
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="ml-auto bg-white/10 text-white/70 border-0"
                    >
                      {category.endpoints.length} endpoints
                    </Badge>
                  </div>
                </div>

                {/* Endpoints List */}
                <div className="divide-y divide-white/5">
                  {category.endpoints.map((endpoint, idx) => (
                    <div
                      key={idx}
                      className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <Badge
                          variant="secondary"
                          className="method-get flex-shrink-0 font-semibold"
                        >
                          {endpoint.method}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <code className="text-sm text-white font-mono block truncate">
                            {endpoint.fullUrl}
                          </code>
                          <p className="text-sm text-muted-foreground mt-1">
                            {endpoint.description}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onTryEndpoint(endpoint.fullUrl)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 rounded-lg transition-all ml-4 flex-shrink-0 group/btn"
                      >
                        Try it
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
