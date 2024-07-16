import React, { ReactElement } from 'react';
import { Card as BootstrapCard, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  subtitle: string | ReactElement;
  image: string;
  link: string;
  onErrorImage?: string;
  isLoading?: boolean;
}

const Card: React.FC<CardProps> = ({ title, subtitle, image, link, onErrorImage, isLoading = false }) => {
  if (isLoading) {
    return (
      <BootstrapCard className="placeholder-glow bg-dark text-light mb-4">
        <Link to={link}>
          <BootstrapCard.Img
            variant="top"
            style={{ minHeight: "12em", minWidth: '16em' }}
            className="placeholder"
          />
          <BootstrapCard.Body>
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          </BootstrapCard.Body>
        </Link>
      </BootstrapCard>
    );
  }

  return (
    <BootstrapCard className="bg-dark text-light mb-4">
      <Link to={link}>
        <BootstrapCard.Img
          variant="top"
          src={image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = onErrorImage ?? '';
          }}
        />
        <BootstrapCard.Body>
          <BootstrapCard.Title>{title}</BootstrapCard.Title>
          <BootstrapCard.Text>{subtitle}</BootstrapCard.Text>
        </BootstrapCard.Body>
      </Link>
    </BootstrapCard>
  );
};

export default Card;