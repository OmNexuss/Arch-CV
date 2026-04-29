// src/infrastructure/api/GithubService.ts

export class GithubService {
  private readonly baseUrl = "https://api.github.com";

  async getProfile(username: string) {
    const response = await fetch(`${this.baseUrl}/users/${username}`);
    if (!response.ok) throw new Error("GitHub kullanıcısı bulunamadı.");
    return response.json();
  }

  async getRepos(username: string) {
    const response = await fetch(`${this.baseUrl}/users/${username}/repos?sort=updated&per_page=10`);
    if (!response.ok) throw new Error("Repolar çekilemedi.");
    return response.json();
  }
}