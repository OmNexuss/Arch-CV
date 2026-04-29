// src/domain/interfaces/IGithubRepository.ts
import { GithubProfile, Project } from "../entities/GithubProfile";

export interface IGithubRepository {
  getProfile(username: string): Promise<GithubProfile>;
  getRepos(username: string): Promise<Project[]>;
}
