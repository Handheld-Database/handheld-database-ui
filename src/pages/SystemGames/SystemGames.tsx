import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormControl } from 'react-bootstrap';
import GameCard from '../../components/Cards/GameCard';
import HandheldDatabaseService from '../../services/HandheldDatabaseService';
import { useParams } from 'react-router-dom';
import { Game } from '../../types/GameT';

const SystemGamesPage: React.FC = () => {
  const { platformKey, systemKey } = useParams<{ platformKey: string, systemKey: string }>();
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [rankFilter, setRankFilter] = useState<string>('ALL');

  useEffect(() => {
    const didMount = async () => {
      setIsLoading(true);
      const gamesResponse = await HandheldDatabaseService.fetchGames(platformKey as string, systemKey as string);
      setGames(gamesResponse);
      setFilteredGames(gamesResponse);
      setIsLoading(false);
    }

    didMount();
  }, [platformKey, systemKey]);

  useEffect(() => {
    setIsLoading(true);
    const filtered = HandheldDatabaseService.filterGames(games, searchTerm, rankFilter);
    setFilteredGames(filtered);
    setTimeout(() => setIsLoading(false), 200)
  }, [searchTerm, rankFilter, games]);

  return (
    <Container className="mt-4 page-content">
        
      <Row>
        <Col lg={12}>
          <div className="main-banner text-light">
            <Row>
              <Col lg={7}>
                <div className="header-text">
                  <h6>Welcome To Handheld Database</h6>
                  <h4><em>Ranking</em> the Best (and Worst) Games!</h4>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={4}>
          <FormControl
            type="text"
            placeholder="Search by name"
            className="mr-sm-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col lg={4}>
          <Form.Control as="select" value={rankFilter} onChange={(e) => setRankFilter(e.target.value)}>
            <option value="ALL">All Ranks</option>
            <option value="PLATINUM">Platinum</option>
            <option value="GOLD">Gold</option>
            <option value="SILVER">Silver</option>
            <option value="BRONZE">Bronze</option>
            <option value="FAULTY">Faulty</option>
          </Form.Control>
        </Col>
      </Row>

      <Row className="mt-5 gallery-section">
        <Col lg={12}>
          <div className='heading-section'>
            <h4><em>Most Popular</em> Games</h4>
          </div>
          <Row id="games">
            {filteredGames?.map((game: Game, i: number) => (
              <Col key={game.key} xs={12} sm={6} md={4} lg={3} className="d-flex align-items-stretch">
                <GameCard
                  platformKey={platformKey}
                  systemKey={systemKey}
                  game={game}
                  key={i}
                  isLoading={isLoading}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

    </Container>
  );
};

export default SystemGamesPage;
