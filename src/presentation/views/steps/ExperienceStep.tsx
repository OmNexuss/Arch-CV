"use client";

import React, { useState } from 'react';
import { useCVStore } from "@/core/store/useCVStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowLeft, Wand2, CheckCircle2 } from "lucide-react";

const ExperienceStep = () => {
  const { projects, prevStep, nextStep } = useCVStore();
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState<Record<string, boolean>>({});

  // ExperienceStep.tsx içinde:
    const handleAIImprove = async (projectName: string, language: string) => {
    if (!descriptions[projectName]) return;
    
    setProcessing(prev => ({ ...prev, [projectName]: true }));
    
    try {
        const response = await fetch('/api/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            projectName, 
            userDescription: descriptions[projectName],
            language 
        }),
        });
        
        const data = await response.json();
        if (data.improvedText) {
        setDescriptions(prev => ({ ...prev, [projectName]: data.improvedText }));
        }
    } catch (error) {
        console.error("Mimar Hatası:", error);
    } finally {
        setProcessing(prev => ({ ...prev, [projectName]: false }));
    }
    };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={prevStep} className="text-slate-500">
          <ArrowLeft className="w-4 h-4 mr-2" /> Geri Dön
        </Button>
        <div className="text-right">
          <h2 className="text-xl font-bold text-slate-900">AI Alchemist</h2>
          <p className="text-xs text-slate-500 text-emerald-600 font-medium">Projeleri deneyime dönüştür</p>
        </div>
      </div>

      {projects.map((project: any, index: number) => (
        <Card key={index} className="border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-emerald-500">
          <CardHeader className="bg-slate-50/50 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg text-slate-800">{project.name}</CardTitle>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="text-[10px] uppercase">{project.language}</Badge>
                  <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-700">GitHub Verified</Badge>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-emerald-500 opacity-50" />
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">Bu projede ne başardınız? (Basitçe yazın)</label>
              <div className="relative">
                <Textarea 
                  placeholder="Örn: Hızlı çalışan bir e-ticaret sitesi yaptım."
                  className="min-h-[100px] focus-visible:ring-emerald-500 border-slate-200"
                  value={descriptions[project.name] || ""}
                  onChange={(e) => setDescriptions(prev => ({ ...prev, [project.name]: e.target.value }))}
                />
                <Button 
                  size="sm"
                  onClick={() => handleAIImprove(project.name, project.language || "Software Development")} // Dil bilgisini ekledik
                  disabled={processing[project.name] || !descriptions[project.name]}
                  className="absolute bottom-2 right-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8">
                  {processing[project.name] ? "Simya Yapılıyor..." : <><Wand2 className="w-3 h-3 mr-2" /> AI ile Parlat</>}
              </Button>
              </div>
            </div>
            
            {descriptions[project.name]?.length > 100 && (
              <div className="flex items-start gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
                <p className="text-xs text-emerald-800 leading-relaxed italic">
                  "Bu açıklama CV'niz için hazırlandı ve deneyim setinize eklendi."
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end pt-8">
        <Button onClick={nextStep} className="bg-slate-900 text-white px-12 h-12 text-lg font-bold">
          Felsefemi Belirle →
        </Button>
      </div>
    </div>
  );
};

export default ExperienceStep;