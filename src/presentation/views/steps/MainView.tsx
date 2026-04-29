"use client";

import React from 'react';
import { useCVStore } from '@/core/store/useCVStore';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const MainView = () => {
    // Store'dan gerekli state ve aksiyonları çekiyoruz
    const { currentStep, nextStep, prevStep } = useCVStore();

    return (
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
            <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${currentStep === 1
                        ? 'opacity-0 pointer-events-none'
                        : 'text-slate-400 hover:text-slate-900'
                    }`}
            >
                Geri
            </button>

            {currentStep < 4 ? (
                <button
                    onClick={nextStep}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-slate-200 transition-all active:scale-95 flex items-center gap-2"
                >
                    Sonraki Adım
                    <ArrowRight className="w-4 h-4" />
                </button>
            ) : (
                <button
                    onClick={() => window.print()}
                    className="px-10 py-4 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-200 transition-all active:scale-95 flex items-center gap-3"
                >
                    <ShieldCheck className="w-5 h-5" />
                    CV'YI KRİSTALİZE ET & İNDİR
                </button>
            )}
        </div>
    );
};

export default MainView;
