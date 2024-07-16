import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

interface GameDetails {
  name: string;
  rank: string;
}

interface PlatformDetails {
  name: string;
  systems: { key: string; name: string }[];
}

const rankColors: { [key: string]: string } = {
  PLATINUM: 'rgb(180, 199, 220)',
  GOLD: 'rgb(207, 181, 59)',
  SILVER: 'rgb(166, 166, 166)',
  BRONZE: 'rgb(205, 127, 50)',
  FAULTY: 'red',
};

const GameDetailsPage: React.FC = () => {
  const { platformKey, systemKey, gameKey } = useParams<{ platformKey: string; systemKey: string; gameKey: string }>();
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [platformDetails, setPlatformDetails] = useState<PlatformDetails | null>(null);
  const [gameContent, setGameContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameResponse = await fetch(`https://handheld-database.github.io/handheld-database/platforms/${platformKey}/systems/${systemKey}/${gameKey}/${gameKey}.json`);
        const gameData = await gameResponse.json();
        setGameDetails(gameData);

        const platformResponse = await fetch(`https://handheld-database.github.io/handheld-database/platforms/${platformKey}/index.json`);
        const platformData = await platformResponse.json();
        setPlatformDetails(platformData);

        const gameMarkdownResponse = await fetch(`https://handheld-database.github.io/handheld-database/platforms/${platformKey}/systems/${systemKey}/${gameKey}/${gameKey}.md`);
        const gameMarkdown = await gameMarkdownResponse.text();

        const overviewMarkdownResponse = await fetch(`https://handheld-database.github.io/handheld-database/commons/overviews/${gameKey}.overview.md`);
        const overviewMarkdown = await overviewMarkdownResponse.text();

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
    <div>

      <Container>
        <Row>
          <Col lg={12}>
            <div className="page-content">
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
                                  <i className="fa fa-star" style={{ color: rankColors[gameDetails?.rank || ''] }}></i> {gameDetails?.rank}
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
            </div>
          </Col>
        </Row>
      </Container>

    </div>
  );
};

export default GameDetailsPage;