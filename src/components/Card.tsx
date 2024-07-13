import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  isLoading?: boolean;
}

const Card: React.FC<CardProps> = ({ title, subtitle, image, link, isLoading = false }) => {
  if (isLoading) {
    return (
      <BootstrapCard className="placeholder-glow bg-dark text-light mb-4">
        <div className="placeholder col-12" style={{height: 250}}/>
        <BootstrapCard.Body>
          <BootstrapCard.Title>
            <span className="placeholder col-12"></span>
          </BootstrapCard.Title>
          <BootstrapCard.Text>
            <span className="placeholder col-7"></span>
          </BootstrapCard.Text>
        </BootstrapCard.Body>
      </BootstrapCard>
    );
  }

  return (
    <BootstrapCard className="bg-dark text-light mb-4">
      <Link to={link}>
        <BootstrapCard.Img variant="top" src={image} />
        <BootstrapCard.Body>
          <BootstrapCard.Title>{title}</BootstrapCard.Title>
          <BootstrapCard.Text>{subtitle}</BootstrapCard.Text>
        </BootstrapCard.Body>
      </Link>
    </BootstrapCard>
  );
};

export default Card;