// src/infrastructure/repositories/GithubRepository.ts
import { IGithubRepository } from "@/domain/interfaces/IGithubRepository";
import { GithubProfile, Project } from "@/domain/entities/GithubProfile";
import { GithubService } from "../api/GithubService";

export class GithubRepository implements IGithubRepository {
  private githubService = new GithubService();

  async getProfile(username: string): Promise<GithubProfile> {
    const rawProfile = await this.githubService.getProfile(username);
    
    return {
      username: rawProfile.login,
      avatarUrl: rawProfile.avatar_url,
      bio: rawProfile.bio || "",
      fullName: rawProfile.name || rawProfile.login,
      publicRepos: rawProfile.public_repos,
      topLanguages: [], // Bu ileride AI veya servis tarafında hesaplanabilir
      recentProjects: [] // getRepos ile doldurulacak
    };
  }

  async getRepos(username: string): Promise<Project[]> {
    const rawRepos = await this.githubService.getRepos(username);
    
    return rawRepos.map((repo: any) => ({
      name: repo.name,
      description: repo.description || "",
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language
    }));
  }
}
