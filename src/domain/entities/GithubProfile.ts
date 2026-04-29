export interface Project {
  name: string;
  description: string;
  url: string;
  stars: number;
  language?: string;
}

export interface GithubProfile {
  username: string;
  avatarUrl: string;
  bio: string;
  fullName: string;
  publicRepos: number;
  topLanguages: string[];
  recentProjects: Project[];
}