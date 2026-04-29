import React from 'react';
import { useCVStore } from '@/core/store/useCVStore';
import { Download, FileText, Share2, ShieldCheck } from 'lucide-react';

const PreviewStep = () => {
    const { personalInfo, projects, philosophy } = useCVStore();

    const handleDownload = () => {
        // İleride buraya PDF export mantığı gelecek
        window.print();
    };

    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            {/* CV Preview Area */}
            <div className="bg-white shadow-2xl border border-slate-200 rounded-sm aspect-[1/1.41] w-full max-w-4xl mx-auto p-12 text-slate-900 overflow-hidden print:shadow-none print:border-none" id="cv-print">
                {/* Header */}
                <header className="border-b-2 border-slate-900 pb-8 mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase">{personalInfo.fullName || 'İsim Soyisim'}</h1>
                        <p className="text-emerald-600 font-bold tracking-widest text-sm mt-1 uppercase">{personalInfo.title || 'Senior Software Architect'}</p>
                    </div>
                    <div className="text-right text-xs space-y-1 text-slate-500 font-medium">
                        <p>{personalInfo.email}</p>
                        <p>{personalInfo.location}</p>
                    </div>
                </header>

                {/* Philosophy / Manifesto */}
                <section className="mb-10">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Philosophy</h2>
                    <p className="text-lg font-medium leading-relaxed italic text-slate-800 border-l-4 border-emerald-500 pl-6">
                        "{philosophy.manifesto || 'Mühendislik vizyonu henüz kristalize edilmedi.'}"
                    </p>
                </section>

                {/* Projects */}
                <section className="mb-10">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Key Projects</h2>
                    <div className="grid gap-6">
                        {projects.map((project, idx) => (
                            <div key={idx} className="group">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-slate-900 text-md uppercase">{project.name}</h3>
                                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">{project.language}</span>
                                </div>
                                <p className="text-sm text-slate-600 leading-snug">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap justify-center gap-4 pb-12">
                <button
                    onClick={handleDownload}
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-800 transition-all active:scale-95 shadow-xl"
                >
                    <Download className="w-5 h-5" />
                    PDF Olarak İndir
                </button>
                <button className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-50 transition-all">
                    <Share2 className="w-5 h-5" />
                    Bağlantıyı Paylaş
                </button>
            </div>
        </div>
    );
};

export default PreviewStep;