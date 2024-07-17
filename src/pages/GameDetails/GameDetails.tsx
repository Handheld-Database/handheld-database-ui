import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import showdown from 'showdown';
import HandheldDatabaseService from '../../services/HandheldDatabaseService';
import { GameDetails } from '../../types/GameT';
import { Platform } from '../../types/PlatformT';

const GameDetailsPage: React.FC = () => {
  const { platformKey, systemKey, gameKey } = useParams<{ platformKey: string; systemKey: string; gameKey: string }>();
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [platformDetails, setPlatformDetails] = useState<Platform | null>(null);
  const [gameContent, setGameContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameResponse = await HandheldDatabaseService.fetchGameDetails(platformKey!, systemKey!, gameKey!);
        setGameDetails(gameResponse);

        const platformResponse = await HandheldDatabaseService.fetchPlatform(platformKey!);
        setPlatformDetails(platformResponse);

        const gameMarkdown = await HandheldDatabaseService.fetchGameMarkdown(platformKey!, systemKey!, gameKey!);

        const overviewMarkdown = await HandheldDatabaseService.fetchGameOverview(gameKey!);

        const fullMarkdown = gameMarkdown.replace("%game_overview%", overviewMarkdown || 'Help us to find a great overview!');
        const converter = new showdown.Converter();
        setGameContent(converter.makeHtml(fullMarkdown));
      } catch (error) {
        console.error('Error fetching game details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [platformKey, systemKey, gameKey]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4 page-content">
      <Row>
        <Col lg={12}>
          <div className="game-details">
            <div className="main-banner" id="main-banner" style={{
              backgroundImage: `url(https://handheld-database.github.io/handheld-database/commons/images/games/${gameKey}.cover.webp), url(/assets/images/not-found-banner.webp)`
            }}>
            </div>
            <Row>
              <Col lg={12}>
                <h2>{gameDetails?.name} Details</h2>
              </Col>
              <Col lg={12}>
                <div className="content">
                  <Row>
                    <Col lg={12}>
                      <div className="left-info">
                        <div className="left">
                          <h4>{gameDetails?.name}</h4>
                          <span>Platform: {platformDetails?.name}</span>
                        </div>
                        <div id="game-rank">
                          <ul>
                            <li>
                              <i className="fa fa-star" style={{ color: HandheldDatabaseService.getRankColor(gameDetails?.rank || '') }}></i> {gameDetails?.rank}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <p dangerouslySetInnerHTML={{ __html: gameContent }}></p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GameDetailsPage;