import React from 'react';
import Card from './Card';
import HandheldDatabaseService from '../../services/HandheldDatabaseService';
import { Game } from '../../types/GameT';
import { Star } from 'lucide-react';

interface CardProps {
  platformKey?: string;
  systemKey?: string;
  game?: Game
  key?: string | number
  isLoading?: boolean;
}

const GameCard: React.FC<CardProps> = ({ platformKey, systemKey, game, key, isLoading = false }) => {
  return (
    <Card
      image={`https://handheld-database.github.io/handheld-database/commons/images/games/${game?.key}.icon.webp`}
      link={`/platforms/${platformKey}/${systemKey}/${game?.key}`}
      title={game?.name ?? 'No title'}
      subtitle={
        <span className="rank-subtitle">
          <Star color={HandheldDatabaseService.getRankColor(game?.rank ?? 'FAULTY')} size={24} />
          <span className="rank-text">{game?.rank}</span>
        </span>
      }
      onErrorImage='/images/not-found.webp'
      isLoading={isLoading}
      key={key}
    />
  );
};

export default GameCard;
