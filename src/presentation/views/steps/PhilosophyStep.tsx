import React, { useState } from 'react';
import { useCVStore } from '@/core/store/useCVStore';
import { Brain, Code2, Target, Zap, Loader2, Quote } from 'lucide-react';

const PhilosophyStep = () => {
    const { philosophy, setPhilosophy } = useCVStore();
    const [loading, setLoading] = useState(false);

    const handleUpdate = (field: string, value: string) => {
        setPhilosophy({ ...philosophy, [field]: value });
    };

    const handleGenerateManifesto = async () => {
        if (!philosophy.principles || !philosophy.approach) return;
        
        setLoading(true);
        try {
            const response = await fetch('/api/improve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    type: 'philosophy',
                    principles: philosophy.principles,
                    approach: philosophy.approach
                }),
            });
            
            const data = await response.json();
            if (data.improvedText) {
                handleUpdate('manifesto', data.improvedText);
            }
        } catch (error) {
            console.error("Manifesto Hatası:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Core Values */}
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                            <Code2 className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-900 uppercase tracking-tight">Temel Prensipler</h3>
                    </div>
                    <textarea
                        placeholder="Örn: Clean Code, Test-Driven Development, Ölçeklenebilir Mimari..."
                        className="w-full min-h-[120px] p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500/20 resize-none text-sm leading-relaxed"
                        value={philosophy?.principles || ''}
                        onChange={(e) => handleUpdate('principles', e.target.value)}
                    />
                </div>

                {/* Approach */}
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Target className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-900 uppercase tracking-tight">Sorun Çözme Yaklaşımı</h3>
                    </div>
                    <textarea
                        placeholder="Karmaşık sistemleri nasıl basitleştirirsiniz? Analitik yaklaşımınız..."
                        className="w-full min-h-[120px] p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500/20 resize-none text-sm leading-relaxed"
                        value={philosophy?.approach || ''}
                        onChange={(e) => handleUpdate('approach', e.target.value)}
                    />
                </div>
            </div>

            {/* AI Inspiration Box */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white overflow-hidden relative group">
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <Brain className="w-6 h-6 text-emerald-400" />
                        <h3 className="text-xl font-bold tracking-tight">Mühendislik Manifestosu</h3>
                    </div>
                    
                    {philosophy.manifesto ? (
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative animate-in zoom-in-95 duration-500">
                            <Quote className="absolute -top-3 -left-3 w-8 h-8 text-emerald-500/20 rotate-180" />
                            <p className="text-slate-300 italic leading-relaxed text-lg">
                                {philosophy.manifesto}
                            </p>
                        </div>
                    ) : (
                        <p className="text-slate-400 text-sm max-w-2xl">
                            Yukarıdaki prensiplerinizi girin. Arch-CV, bu verileri kullanarak sizin için
                            "Senior Architect" ağırlığında bir manifesto hazırlayacak.
                        </p>
                    )}

                    <button 
                        onClick={handleGenerateManifesto}
                        disabled={loading || !philosophy.principles || !philosophy.approach}
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Zap className="w-4 h-4 fill-current" />
                        )}
                        {philosophy.manifesto ? "Manifestoyu Yenile" : "Vizyonu Kristalize Et"}
                    </button>
                </div>
                {/* Dekoratif Arka Plan */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />
            </div>
        </div>
    );
};

export default PhilosophyStep;