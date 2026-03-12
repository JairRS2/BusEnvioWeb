import { useState } from 'react';
import Header from '@/components/Header';
import TrackingSection from '@/components/TrackingSection';
import QuoterSection from '@/components/QuoterSection';
import DeparturesSection from '@/components/DeparturesSection';
import BottomNav from '@/components/BottomNav';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <Header />

      {activeTab === 'home' && (
        <>
          <TrackingSection />
          <QuoterSection />
          <DeparturesSection />
        </>
      )}

      {activeTab === 'quote' && (
        <>
          <QuoterSection />
        </>
      )}

      {activeTab === 'departures' && (
        <>
          <DeparturesSection />
        </>
      )}

      {activeTab === 'account' && (
        <div className="px-4 pt-6 pb-28">
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm">Próximamente</p>
            <p className="text-xs text-muted-foreground mt-1">Inicio de sesión y gestión de envíos</p>
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
