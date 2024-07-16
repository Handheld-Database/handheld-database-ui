import { Game, GameDetails } from "../types/GameT";
import { Platform, PlatformIndex } from "../types/PlatformT";

const baseUrl = 'https://handheld-database.github.io/handheld-database';

const HandheldDatabaseService = {
  getRankColor: (key: string): string | undefined => {
    return {
      PLATINUM: 'rgb(180, 199, 220)',
      GOLD: 'rgb(207, 181, 59)',
      SILVER: 'rgb(166, 166, 166)',
      BRONZE: 'rgb(205, 127, 50)',
      FAULTY: 'red'
    }[key];
  },
  fetchPlatformsIndex: async (): Promise<PlatformIndex[]> => {
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
  fetchPlatform: async (platformKey: string): Promise<Platform> => {
    try {
      const response = await fetch(`${baseUrl}/platforms/${platformKey}/index.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch systems from ${platformKey}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching systems:', error);
      throw error;
    }
  },
  fetchGames: async (platformKey: string, systemKey: string): Promise<Game[]> => {
    try {
      const response = await fetch(`${baseUrl}/platforms/${platformKey}/systems/${systemKey}/index.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch games from ${platformKey}/${systemKey}`);
      }
      const data = await response.json();
      return data.games;
    } catch (error) {
      console.error('Error fetching systems:', error);
      throw error;
    }
  },
  fetchGameDetails: async (platformKey: string, systemKey: string, gameKey: string): Promise<GameDetails> => {
    try {
      const response = await fetch(`${baseUrl}/platforms/${platformKey}/systems/${systemKey}/${gameKey}/${gameKey}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch game details from ${platformKey}/${systemKey}/${gameKey}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching game details:', error);
      throw error;
    }
  },
  fetchGameOverview: async (gameKey: string): Promise<string|undefined> => {
    try {
      const response = await fetch(`${baseUrl}/commons/overviews/${gameKey}.overview.md`);
      if (!response.ok) {
        throw new Error('Failed to load game overview');
      }
      return response.text();
    } catch (error) {
      console.error('Error fetching game overview:', error);
      return undefined;
    }
  },
  fetchGameMarkdown: async (platformKey: string, systemKey: string, gameKey: string): Promise<string> => {
    try {
      const response = await fetch(`${baseUrl}/platforms/${platformKey}/systems/${systemKey}/${gameKey}/${gameKey}.md`);
      if (!response.ok) {
        throw new Error(`Failed to fetch game markdown from ${platformKey}/${systemKey}/${gameKey}`);
      }
      return response.text();
    } catch (error) {
      console.error('Error fetching game markdown:', error);
      throw error;
    }
  },
  filterGames: (games: Game[], searchTerm: string, rankFilter: string): Game[] => {
    let filteredGames = games;
  
    if (searchTerm) {
      filteredGames = filteredGames.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  
    if (rankFilter !== 'ALL') {
      filteredGames = filteredGames.filter(game => game.rank === rankFilter);
    }
  
    return filteredGames;
  }
};

export default HandheldDatabaseService;