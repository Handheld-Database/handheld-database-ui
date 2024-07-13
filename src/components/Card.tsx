import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, image, link }) => {
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
