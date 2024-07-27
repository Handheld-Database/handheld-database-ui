import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Accordion } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import showdown from 'showdown';
import HandheldDatabaseService from '../../services/HandheldDatabaseService';
import { GameDetails } from '../../types/GameT';
import { Platform } from '../../types/PlatformT';

const GameDetailsPage: React.FC = () => {
  const { platformKey, systemKey, gameKey } = useParams<{ platformKey: string; systemKey: string; gameKey: string }>();
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [platformDetails, setPlatformDetails] = useState<Platform | null>(null);
  const [gameContent, setGameContent] = useState<string>('');
  const [gameOverview, setGameOverview] = useState<string>('');
  const [tester, setTester] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isReviewLoading, setIsReviewLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGameOverview = async () => {
      try {
        const overviewMarkdown = await HandheldDatabaseService.fetchGameOverview(gameKey!);
        const converter = new showdown.Converter();
        setGameOverview(converter.makeHtml(overviewMarkdown || 'Help us to find a great overview!'));
      } catch (error) {
        console.error('Error fetching game details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameOverview();
  }, [gameKey]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameResponse = await HandheldDatabaseService.fetchGameDetails(platformKey!, systemKey!, gameKey!);
        setGameDetails(gameResponse);

        const platformResponse = await HandheldDatabaseService.fetchPlatform(platformKey!);
        setPlatformDetails(platformResponse);
      } catch (error) {
        console.error('Error fetching game details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [platformKey, systemKey, gameKey]);

  useEffect(() => {
    const fetchGameMarkdown = async () => {
      try {
        setIsReviewLoading(true);
        const gameMarkdown = await HandheldDatabaseService.fetchGameMarkdown(platformKey!, systemKey!, gameKey!, tester!);
        const converter = new showdown.Converter();
        setGameContent(converter.makeHtml(gameMarkdown));
      } catch (error) {
        console.error('Error fetching game content:', error);
      } finally {
        setIsReviewLoading(false);
      }
    };

    if (tester) {
      fetchGameMarkdown();
    }
  }, [platformKey, systemKey, gameKey, tester]);

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
                      <p dangerouslySetInnerHTML={{ __html: gameOverview }}></p>
                    </Col>
                  </Row>
                  <h2>Reviews</h2>
                  <Accordion>
                    {gameDetails?.testers?.map((tester: string, i: number) => (
                      <Accordion.Item key={i} eventKey={i.toString()} onClick={() => setTester(tester)}>
                        <Accordion.Header className="review-header">
                          {tester}
                        </Accordion.Header>
                        <Accordion.Body>
                          {isReviewLoading ? (
                            <Spinner animation="border" />
                          ) : (
                            <ul style={{textAlign: 'left'}}>
                              <p dangerouslySetInnerHTML={{ __html: gameContent }}></p>
                            </ul>
                          )}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
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
