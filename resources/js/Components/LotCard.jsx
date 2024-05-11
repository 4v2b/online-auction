import { Card } from "react-bootstrap";

export default function LotCard({ id, title, currentBid, photoBlob }) {
    const currentBidLabel = 'Поточна ставка: ' + currentBid;

    return (
        <Card style={{ width: '18rem' }} onClick={()=> route(`/lot/${id}`)}>
        <Card.Img variant="top" src={URL.createObjectURL(photoBlob)} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>
          {currentBidLabel}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    );
}