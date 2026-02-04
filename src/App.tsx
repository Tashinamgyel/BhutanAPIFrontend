import { useState, useRef, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { NoticeModal } from '@/components/NoticeModal';
import { HeroSection } from '@/sections/HeroSection';
import { QuickStartSection } from '@/sections/QuickStartSection';
import { ApiConsole } from '@/sections/ApiConsole';
import { EndpointsSection } from '@/sections/EndpointsSection';

function App() {
  const [activeSection, setActiveSection] = useState('general');
  const [consoleKey, setConsoleKey] = useState(0);
  const [consoleUrl, setConsoleUrl] = useState<string | undefined>(undefined);
  const consoleRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTryEndpoint = useCallback((url: string) => {
    setConsoleUrl(url);
    setConsoleKey(prev => prev + 1);
    setTimeout(() => {
      consoleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col grid-pattern">
      <NoticeModal />
      <Header />
      
      <div className="flex flex-1 pt-16">
        <Sidebar 
          activeSection={activeSection} 
          onSectionClick={handleSectionClick} 
        />
        
        <main className="flex-1 lg:ml-72">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
            <HeroSection />
            
            <div ref={consoleRef}>
              <ApiConsole 
                key={consoleKey}
                initialUrl={consoleUrl}
              />
            </div>
            
            <QuickStartSection />
            
            <EndpointsSection
              activeSection={activeSection}
              onTryEndpoint={handleTryEndpoint}
            />
          </div>
          
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
