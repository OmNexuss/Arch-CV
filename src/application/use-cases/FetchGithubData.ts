// src/application/use-cases/FetchGithubData.ts
import { GithubService } from "@/infrastructure/api/GithubService";

export class FetchGithubData {
  private githubService = new GithubService();

  async execute(username: string) {
    const profile = await this.githubService.getProfile(username);
    const repos = await this.githubService.getRepos(username);

    // Efendim, burada basit bir "Mapping" (Dönüştürme) yapıyoruz.
    return {
      fullName: profile.name || profile.login,
      bio: profile.bio || "",
      avatarUrl: profile.avatar_url,
      projects: repos.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count
      }))
    };
  }
}