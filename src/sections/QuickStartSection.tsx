import { useState, useEffect } from 'react';
import { Copy, Check, Terminal, Code2, FileCode } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { quickStartExamples } from '@/types/api';
import Prism from 'prismjs';

const tabs = [
  { id: 'curl', label: 'cURL', icon: Terminal },
  { id: 'javascript', label: 'JavaScript', icon: Code2 },
  { id: 'python', label: 'Python', icon: FileCode },
];

export function QuickStartSection() {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleCopy = (content: string, tab: string) => {
    navigator.clipboard.writeText(content);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const highlightCode = (code: string, language: string) => {
    return Prism.highlight(code, Prism.languages[language] || Prism.languages.plain, language);
  };

  return (
    <section className="py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Quick Start</h2>
            <p className="text-muted-foreground">
              Get started in seconds. No authentication required.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <Tabs defaultValue="curl" className="w-full">
          <TabsList className="w-full justify-start rounded-none bg-white/5 border-b border-white/10 p-2 h-auto gap-1">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-lg px-5 py-2.5 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-none text-muted-foreground flex items-center gap-2 transition-all"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(quickStartExamples).map(([key, code]) => (
            <TabsContent key={key} value={key} className="mt-0 relative group">
              <button
                onClick={() => handleCopy(code, key)}
                className="absolute top-4 right-4 p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                title="Copy to clipboard"
              >
                {copiedTab === key ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              <pre className="p-6 overflow-x-auto text-sm bg-[#0a0f1c]">
                <code
                  className="language-javascript"
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(code, key === 'curl' ? 'bash' : key),
                  }}
                />
              </pre>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
