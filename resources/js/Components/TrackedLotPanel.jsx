import { router } from '@inertiajs/react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function TrackedLot({ lot, onDelete }) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const cardStyle = {
    marginBottom: '20px',
    cursor: 'pointer',
    margin: 'auto'  // Center the card horizontally
  };

  const imgStyle = {
    objectFit: 'contain',
    width: '100%',
    height: '150px',
    borderRadius: '5px',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  };

  const buttonStyle = {
    transition: 'background-color 0.2s ease-in-out',
    backgroundColor: isButtonHovered ? '#c82333' : '#dc3545'
  };

  return (
    <Card
      style={cardStyle}
      onClick={() => router.get(`/catalog/${lot.id}`)}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <Row noGutters>
        <Col md={3}>
          <Card.Img variant="top" src={lot.photo} style={imgStyle} />
        </Col>
        <Col md={7}>
          <Card.Body>
            <Card.Title style={titleStyle}>{lot.title}</Card.Title>
            <Card.Text>
              {lot.bid ? (<><strong>Поточна ставка:</strong> {lot.bid}</>) : (<><strong>Початкова ціна:</strong> {lot.price}</>)}
              грн<br />
              <strong>Діє до:</strong> {new Date(lot.ends_at).toLocaleDateString()}
            </Card.Text>
          </Card.Body>
        </Col>
        <Col md={2} className="d-flex align-items-center justify-content-center">
          <Button
            variant="danger"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card click event
              onDelete(lot.id);
            }}
            style={buttonStyle}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Видалити
          </Button>
        </Col>
      </Row>
    </Card>
  );
}
