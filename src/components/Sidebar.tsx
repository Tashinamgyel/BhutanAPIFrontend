import { useState, useMemo } from 'react';
import { Search, Crown, Heart, MapPin, Mountain, Building, Globe, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { endpointCategories } from '@/types/api';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  crown: Crown,
  heart: Heart,
  mapPin: MapPin,
  mountain: Mountain,
  building: Building,
  globe: Globe,
};

interface SidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export function Sidebar({ activeSection, onSectionClick }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    endpointCategories.map(c => c.id)
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return endpointCategories;
    
    const query = searchQuery.toLowerCase();
    return endpointCategories
      .map((category) => ({
        ...category,
        endpoints: category.endpoints.filter(
          (endpoint) =>
            endpoint.path.toLowerCase().includes(query) ||
            endpoint.description.toLowerCase().includes(query)
        ),
      }))
      .filter(
        (category) =>
          category.endpoints.length > 0 ||
          category.name.toLowerCase().includes(query)
      );
  }, [searchQuery]);

  const allEndpoints = useMemo(() => {
    return endpointCategories.flatMap((cat) => 
      cat.endpoints.map((ep) => ({ ...ep, categoryId: cat.id }))
    );
  }, []);

  const filteredEndpoints = useMemo(() => {
    if (!searchQuery.trim()) return allEndpoints;
    const query = searchQuery.toLowerCase();
    return allEndpoints.filter(
      (ep) =>
        ep.path.toLowerCase().includes(query) ||
        ep.description.toLowerCase().includes(query)
    );
  }, [searchQuery, allEndpoints]);

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-72 bg-sidebar-background/80 backdrop-blur-xl border-r border-white/5 overflow-y-auto z-40 hidden lg:block">
      <div className="p-5">
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-orange-400 transition-colors" />
          <Input
            type="text"
            placeholder="Search endpoints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-white/10 text-sm rounded-lg focus:border-orange-500/50 focus:ring-orange-500/20 transition-all"
          />
        </div>
      </div>

      <nav className="px-3 pb-6">
        {searchQuery.trim() ? (
          // Show filtered endpoints when searching
          <div className="space-y-1">
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Search Results
            </p>
            {filteredEndpoints.map((endpoint, idx) => (
              <button
                key={`${endpoint.categoryId}-${idx}`}
                onClick={() => onSectionClick(endpoint.categoryId)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 hover:bg-white/5 text-left group"
              >
                <span className="px-2 py-0.5 text-xs font-semibold rounded-md method-get flex-shrink-0">
                  GET
                </span>
                <span className="truncate text-muted-foreground group-hover:text-white transition-colors">
                  {endpoint.path}
                </span>
              </button>
            ))}
            {filteredEndpoints.length === 0 && (
              <p className="px-3 py-4 text-sm text-muted-foreground text-center">
                No endpoints found
              </p>
            )}
          </div>
        ) : (
          // Show categories when not searching
          <div className="space-y-2">
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Endpoints
            </p>
            {filteredCategories.map((category) => {
              const Icon = iconMap[category.icon];
              const isActive = activeSection === category.id;
              const isExpanded = expandedCategories.includes(category.id);
              
              return (
                <div key={category.id} className="space-y-1">
                  <button
                    onClick={() => {
                      onSectionClick(category.id);
                      toggleCategory(category.id);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/20'
                        : 'text-muted-foreground hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : ''}`} />
                      )}
                      <span className="truncate">{category.name}</span>
                    </div>
                    <ChevronRight 
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
                    />
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-4 space-y-0.5 border-l border-white/5 pl-3">
                      {category.endpoints.map((endpoint, idx) => (
                        <button
                          key={idx}
                          onClick={() => onSectionClick(category.id)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-white/5 text-left group"
                        >
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded method-get flex-shrink-0">
                            GET
                          </span>
                          <span className="truncate text-muted-foreground/70 group-hover:text-muted-foreground text-xs">
                            {endpoint.path}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </nav>
    </aside>
  );
}
