import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HandheldDatabaseService from '../../services/HandheldDatabaseService';
import Card from '../../components/Cards/Card';
import { Collaborator } from '../../types/CollaboratorT';

const CollaboratorsPage: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCollaboratorsData = async () => {
      try {
        const collaboratorsData = await HandheldDatabaseService.fetchCollaborators();
        setCollaborators(collaboratorsData);
      } catch (error) {
        console.error('Error fetching collaborators data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollaboratorsData();
  }, []);

  return (
    <Container className="mt-4 page-content">

      <Row className="mt-5 gallery-section">
        <Col lg={12}>
          <div className='heading-section'>
            <h4>
              <em>GitHub</em> Collaborators
            </h4>
          </div>
          <Row id="collaborators">
            {collaborators?.map((collaborator, i) => (
              <Col lg={3} sm={6} key={collaborator.login}>
                <Card
                  image={collaborator.avatar_url}
                  link={`https://github.com/${collaborator.login}`}
                  title={collaborator.login}
                  subtitle="View Profile"
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

export default CollaboratorsPage;
