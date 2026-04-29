"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FetchGithubData } from "@/application/use-cases/FetchGithubData";
import { useCVStore } from "@/core/store/useCVStore";
import { Badge } from "@/components/ui/badge"; // Not: Eğer Badge yoksa hata verebilir, aşağıda komutu paylaştım.
import { Code2, Star, FolderGit2 } from "lucide-react";


const IdentityStep = () => {
  const { personalInfo, setPersonalInfo, setProjects, projects } = useCVStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetch = async () => {
    if (!personalInfo.githubUsername) return;
    setLoading(true);
    try {
      const useCase = new FetchGithubData();
      const data = await useCase.execute(personalInfo.githubUsername);
      
      setPersonalInfo({
        fullName: data.fullName,
        avatarUrl: data.avatarUrl,
      });
      setProjects(data.projects);
    } catch (error) {
      alert("Hata: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-emerald-100 shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl text-emerald-900 font-bold">Dijital Kimlik</CardTitle>
            <CardDescription>
              GitHub verilerinle profesyonel profilini otomatik oluştur.
            </CardDescription>
          </div>
          {personalInfo.avatarUrl && (
            <img 
              src={personalInfo.avatarUrl} 
              alt="Profile" 
              className="w-16 h-16 rounded-full border-2 border-emerald-500 shadow-sm"
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullname">Ad Soyad</Label>
            <Input 
                id="fullname" 
                placeholder="Ali Rıza Fatih Bakırcı" 
                value={personalInfo.fullName}
                onChange={(e) => setPersonalInfo({ fullName: e.target.value })}
                className="focus-visible:ring-emerald-500" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Ünvan</Label>
            <Input 
                id="title" 
                placeholder="Software Architect" 
                value={personalInfo.title}
                onChange={(e) => setPersonalInfo({ title: e.target.value })}
                className="focus-visible:ring-emerald-500" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input 
                id="email" 
                type="email"
                placeholder="mimar@archcv.com" 
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ email: e.target.value })}
                className="focus-visible:ring-emerald-500" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Konum</Label>
            <Input 
                id="location" 
                placeholder="İstanbul, Türkiye" 
                value={personalInfo.location}
                onChange={(e) => setPersonalInfo({ location: e.target.value })}
                className="focus-visible:ring-emerald-500" 
            />
          </div>
        </div>

        <div className="p-4 bg-emerald-50/50 border border-emerald-100 border-dashed rounded-lg space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github" className="text-emerald-800 font-medium">GitHub Entegrasyonu</Label>
            <div className="flex gap-2">
              <Input 
                id="github" 
                placeholder="GitHub Kullanıcı Adı" 
                value={personalInfo.githubUsername}
                onChange={(e) => setPersonalInfo({ githubUsername: e.target.value })}
                className="bg-white focus-visible:ring-emerald-500" 
              />
              <Button 
                onClick={handleFetch} 
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {loading ? "Bağlanıyor..." : "Verileri Senkronize Et"}
              </Button>
            </div>
          </div>
        </div>

        {/* Efendim, işte GitHub'dan gelen projelerin önizleme alanı */}
        {projects.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-500 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4" /> Tespit Edilen Projeler ({projects.length})
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {projects.slice(0, 5).map((project: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-800 text-sm">{project.name}</span>
                    <span className="text-xs text-slate-500 truncate max-w-[300px]">
                      {project.description || "Açıklama belirtilmemiş."}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {project.language && (
                      <div className="flex items-center gap-1">
                        <Code2 className="w-3 h-3 text-emerald-600" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase">{project.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500" />
                      <span className="text-xs font-medium text-slate-600">{project.stars}</span>
                    </div>
                  </div>
                </div>
              ))}
              {projects.length > 5 && (
                <p className="text-[10px] text-center text-slate-400 italic">...ve {projects.length - 5} proje daha hafızaya alındı.</p>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-end pt-6 border-t border-slate-100">
          <Button 
            onClick={() => useCVStore.getState().nextStep()} // Doğrudan store'dan tetikliyoruz
            disabled={!personalInfo.fullName || loading}
            className="bg-slate-900 text-white hover:bg-slate-800 px-8 transition-all active:scale-95"
          >
            Deneyimlerimi Yapılandır →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdentityStep;