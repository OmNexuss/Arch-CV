// src/application/use-cases/FetchGithubData.ts
import { IGithubRepository } from "@/domain/interfaces/IGithubRepository";
import { GithubRepository } from "@/infrastructure/repositories/GithubRepository";

export class FetchGithubData {
  private githubRepository: IGithubRepository;

  constructor(repository?: IGithubRepository) {
    this.githubRepository = repository || new GithubRepository();
  }

  async execute(username: string) {
    const profile = await this.githubRepository.getProfile(username);
    const projects = await this.githubRepository.getRepos(username);

    return {
      fullName: profile.fullName,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      projects: projects
    };
  }
}