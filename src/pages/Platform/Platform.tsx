import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Platform } from '../../types/PlatformT';
import Card from '../../components/Cards/Card';
import HandheldDatabaseService from '../../services/HandheldDatabaseService';
import { useParams } from 'react-router-dom';
import { System } from '../../types/SystemT';

const PlatformPage: React.FC = () => {
  const { platformKey } = useParams<{ platformKey: string }>();
  const [platform, setPlatform] = useState<Platform>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    const didMount = async () => {
      const platform = await HandheldDatabaseService.fetchPlatform(platformKey as string);
      setPlatform(platform);
      setIsLoading(false);
    }

    didMount();

    return () => {}
  }, []);

  return (
    <Container className="mt-4 page-content">

      <Row>
        <Col lg={12}>
          <div className="main-banner text-light">
            <Row>
              <Col lg={7}>
                <div className="header-text">
                  <h6>Welcome To Handheld Database</h6>
                  <h4>
                    <em>Ranking</em> the Best (and Worst) Games!
                  </h4>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row className="mt-5 gallery-section">
        <Col lg={12}>
          <div className='heading-section'>
            <h4>
              <em>List of</em> Systems
            </h4>
          </div>
          <Row id="systems">
            {platform?.systems.map((system: System, i: number) => (
              <Col lg={3} sm={6} key={system.key}>
                <Card 
                  image={`https://handheld-database.github.io/handheld-database/commons/images/systems/${system.key}.webp`}
                  link={`/platforms/${platform.database_key}/${system.key}`}
                  title={system.name}
                  subtitle={system.key}
                  isLoading={isLoading}
                  key={i}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

    </Container>
  );
};

export default PlatformPage;