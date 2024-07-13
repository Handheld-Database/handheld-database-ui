import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4">
     <Container>
        <Row>
            <Col lg={12}>
            <p>
                GitHub <a href="https://github.com/Handheld-Database/handheld-database-ui">Handeheld Database UI</a>.
            </p>
            </Col>
        </Row>
     </Container>
    </footer>
  );
};

export default Footer;