// src/app/page.tsx
"use client";

import IdentityStep from "@/presentation/views/steps/IdentityStep";
import ExperienceStep from "@/presentation/views/steps/ExperienceStep";
import PhilosophyStep from "@/presentation/views/steps/PhilosophyStep";
import PreviewStep from "@/presentation/views/steps/PreviewStep";
import MainView from "@/presentation/views/steps/MainView";
import { useCVStore } from "@/core/store/useCVStore";

export default function Home() {
  const { currentStep } = useCVStore();

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">


        <header className="text-center mb-12">
          <div className="inline-block p-3 rounded-2xl bg-white shadow-sm border border-slate-100 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-slate-900 rounded-xl">
              <span className="text-white font-black text-xl italic">A</span>
            </div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            ARCH-CV <span className="text-emerald-600">.</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.2em] mt-2">
            Engineering Career Architecture
          </p>
        </header>

        {/* Adım İçeriği */}
        <div className="mt-8">
          {currentStep === 1 && <IdentityStep />}
          {currentStep === 2 && <ExperienceStep />}
          {currentStep === 3 && <PhilosophyStep />}
          {currentStep === 4 && <PreviewStep />}

          {/* Gelecek adımlar için yer tutucu */}
          {currentStep > 4 && (
            <div className="text-center p-10 bg-white rounded-xl shadow-sm border border-emerald-100">
              <h2 className="text-xl font-bold">Gelecek Aşama: {currentStep}</h2>
              <p className="text-slate-500">Mimar yolda...</p>
            </div>
          )}
        </div>

        {/* Navigasyon Butonları */}
        <MainView />
      </div>
    </main>
  );
}