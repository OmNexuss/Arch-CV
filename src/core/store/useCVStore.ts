import { create } from 'zustand';

interface CVState {
  currentStep: number;
  personalInfo: {
    fullName: string;
    title: string;
    githubUsername: string;
    avatarUrl: string;
    email: string;
    location: string;
  };
  projects: any[]; 
  philosophy: {
    principles: string;
    approach: string;
    manifesto: string;
  };
  
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setPersonalInfo: (info: Partial<CVState['personalInfo']>) => void;
  setProjects: (projects: any[]) => void;
  setPhilosophy: (philosophy: Partial<CVState['philosophy']>) => void;
}

export const useCVStore = create<CVState>((set) => ({
  currentStep: 1,
  personalInfo: {
    fullName: '',
    title: '',
    githubUsername: '',
    avatarUrl: '',
    email: '',
    location: '',
  },
  projects: [],
  philosophy: {
    principles: '',
    approach: '',
    manifesto: '',
  },

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setPersonalInfo: (newInfo) => 
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...newInfo }
    })),
  setProjects: (projects) => set({ projects }),
  setPhilosophy: (newPhilosophy) =>
    set((state) => ({
      philosophy: { ...state.philosophy, ...newPhilosophy }
    })),
}));
