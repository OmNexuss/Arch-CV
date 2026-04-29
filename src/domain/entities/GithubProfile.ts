// src/domain/entities/GithubProfile.ts

export interface GithubProfile {
  username: string;
  avatarUrl: string;
  bio: string;
  publicRepos: number;
  topLanguages: string[]; // AI burada devreye girip en çok kullanılan dilleri süzecek
  recentProjects: {
    name: string;
    description: string;
    url: string;
    stars: number;
  }[];
}