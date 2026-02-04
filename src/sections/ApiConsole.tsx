import { useState, useEffect } from 'react';
import { Send, Play, AlertCircle, CheckCircle2, Clock, Globe, MapPin, Landmark, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { API_BASE_URL, PROXY_BASE_URL } from '@/types/api';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';

const presetEndpoints = [
  { label: 'General Details', url: `${API_BASE_URL}/details`, icon: Globe },
  { label: 'All Dzongkhags', url: `${API_BASE_URL}/dzongkhags`, icon: MapPin },
  { label: 'Thimphu Info', url: `${API_BASE_URL}/dzongkhags/Thimphu`, icon: Landmark },
  { label: 'GNH Pillars', url: `${API_BASE_URL}/gnh/pillars`, icon: Heart },
];

interface ApiConsoleProps {
  initialUrl?: string;
}

export function ApiConsole({ initialUrl }: ApiConsoleProps) {
  const [url, setUrl] = useState(initialUrl || `${API_BASE_URL}/details`);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  useEffect(() => {
    if (initialUrl) {
      setUrl(initialUrl);
    }
  }, [initialUrl]);

  useEffect(() => {
    if (response) {
      Prism.highlightAll();
    }
  }, [response]);

  const handleSend = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setStatusCode(null);
    setResponseTime(null);

    const startTime = performance.now();

    try {
      const proxyUrl = url.replace(API_BASE_URL, PROXY_BASE_URL);
      
      const res = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      setStatusCode(res.status);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePresetClick = (presetUrl: string) => {
    setUrl(presetUrl);
    setResponse(null);
    setError(null);
  };

  const highlightJson = (json: string) => {
    return Prism.highlight(json, Prism.languages.json || Prism.languages.plain, 'json');
  };

  return (
    <section className="py-12">
      <div className="glass-card rounded-2xl overflow-hidden glow-orange">
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-gradient-to-r from-orange-500/10 to-amber-500/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">API Playground</h2>
              <p className="text-sm text-muted-foreground">
                Test endpoints directly from your browser
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* URL Input */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Enter API URL..."
                className="w-full bg-[#0a0f1c] border-white/10 font-mono text-sm pr-4 py-6 rounded-xl focus:border-orange-500/50 focus:ring-orange-500/20"
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-6 rounded-xl font-semibold btn-glow"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">Quick examples:</span>
            {presetEndpoints.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePresetClick(preset.url)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white rounded-lg transition-all border border-white/5 hover:border-orange-500/30"
              >
                <preset.icon className="w-4 h-4" />
                {preset.label}
              </button>
            ))}
          </div>

          {/* Response Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-sm font-medium text-white">Response</span>
              </div>
              
              <div className="flex items-center gap-3">
                {responseTime !== null && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {responseTime}ms
                  </div>
                )}
                {statusCode && (
                  <Badge
                    variant="secondary"
                    className={`${
                      statusCode >= 200 && statusCode < 300
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                        : 'bg-red-500/15 text-red-400 border border-red-500/25'
                    }`}
                  >
                    {statusCode >= 200 && statusCode < 300 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                    )}
                    {statusCode}
                  </Badge>
                )}
              </div>
            </div>

            <div className="bg-[#0a0f1c] border border-white/10 rounded-xl min-h-[250px] max-h-[450px] overflow-auto">
              {response ? (
                <pre className="p-5 text-sm">
                  <code
                    className="language-json"
                    dangerouslySetInnerHTML={{ __html: highlightJson(response) }}
                  />
                </pre>
              ) : error ? (
                <div className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-red-400 font-semibold mb-1">Request Failed</p>
                    <p className="text-muted-foreground text-sm">{error}</p>
                    <p className="text-muted-foreground/60 text-xs mt-3">
                      The backend server may be temporarily unavailable. Please try again later.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-5 flex flex-col items-center justify-center h-[250px] text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground">
                    Enter a URL and click Send to see the API response
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
