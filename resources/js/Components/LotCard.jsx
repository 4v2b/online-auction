import { Card, Button, Row, Col } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons"
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function LotCard({ id, title, currentBid, preview, tracked, onTracking, price }) {
  const [isHovered, setIsHovered] = useState(false);
  const { auth } = usePage().props;

  const currentBidLabel = currentBid ? currentBid : price + ' грн';

  return (
    <div className="position-relative">
      <Card
        onClick={() => router.get(`/catalog/${id}`)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: '18rem', cursor: 'pointer' }}
      >
        <Card.Img variant="top" src={preview} />
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle>
                {currentBidLabel} грн
              </Card.Subtitle>
            </Col>
            <Col className="d-flex flex-row-reverse align-items-center">
              {auth.user ?
                (<Button
                  onMouseEnter={() => setIsHovered(true)}
                  variant="primary"
                  style={{ display: isHovered ? 'block' : 'none', zIndex: 1, border: 'none' }}
                  className=" round"
                  onClick={(e) => { e.stopPropagation(); onTracking(tracked, id) }}
                >{tracked ? (<HeartFill />) : (<Heart />)}</Button>) : (<></>)}
            </Col>
          </Row>

        </Card.Body>
      </Card>

    </div >
  );
}