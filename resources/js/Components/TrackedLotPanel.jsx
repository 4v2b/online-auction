import { Row, Col, Card, Button } from 'react-bootstrap';

//Todo replace lot's fields with real ones
export default function TrackedLot({lot, onDelete}){
    return (
        <Card style={{ marginBottom: '20px' }}>
          <Row noGutters>
            <Col md={4}>
              <Card.Img variant="top" src={lot.photo} />
            </Col>
            <Col md={7}>
              <Card.Body>
                <Card.Title>{lot.title}</Card.Title>
                <Card.Text>
                  <strong>Bid:</strong> ${lot.bid}<br />
                  <strong>Expires on:</strong> {new Date(lot.exp_date).toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Col>
            <Col md={1} className="d-flex align-items-center justify-content-center">
              <Button variant="danger" onClick={() => onDelete(lot.id)}>Видалити</Button>
            </Col>
          </Row>
        </Card>
      );
}