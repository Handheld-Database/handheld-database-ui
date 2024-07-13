import { Platform } from "../types/PlatformT";

const baseUrl = 'https://handheld-database.github.io/handheld-database'

const HandheldDatabaseService = {
  fetchPlatforms: async (): Promise<Platform[]> => {
    try {
      const response = await fetch(`${baseUrl}/platforms/index.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch platforms');
      }
      const data = await response.json();
      return data.platforms;
    } catch (error) {
      console.error('Error fetching popular platforms:', error);
      throw error;
    }
  },
  fetchSytems: async (platformKey: string): Promise<Platform[]> => {
    try {
      const response = await fetch(`${baseUrl}/platforms/${platformKey}/index.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch systems from ${platformKey}`);
      }
      const data = await response.json();
      return data.platforms;
    } catch (error) {
      console.error('Error fetching systems:', error);
      throw error;
    }
  },
  fetchGames: async (platformKey: string, systemKey: string): Promise<Platform[]> => {
    try {
      const response = await fetch(`${baseUrl}/platforms/${platformKey}/systems/${systemKey}/index.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch games from ${platformKey}/${systemKey}`);
      }
      const data = await response.json();
      return data.platforms;
    } catch (error) {
      console.error('Error fetching systems:', error);
      throw error;
    }
  },
  fetchGame: async (platformKey: string, systemKey: string, gameKey: string): Promise<Platform[]> => {
    try {
      const response = await fetch(`${baseUrl}/platforms/${platformKey}/systems/${systemKey}/${gameKey}/${gameKey}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch games from ${platformKey}/${systemKey}/${gameKey}`);
      }
      const data = await response.json();
      return data.platforms;
    } catch (error) {
      console.error('Error fetching systems:', error);
      throw error;
    }
  }
};

export default HandheldDatabaseService;