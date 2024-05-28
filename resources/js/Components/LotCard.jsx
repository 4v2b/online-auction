import { Card, Button } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons"
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function LotCard({ id, title, currentBid, preview, tracked, onTracking, price }) {
  const [isHovered, setIsHovered] = useState(false);
  const { auth } = usePage().props;

  const currentBidLabel =  currentBid ? currentBid : price + ' грн';

  return (
    <Card
      style={{ width: '18rem', cursor: 'pointer' }}
      onClick={() => router.get(`/catalog/${id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Img variant="top" src={preview} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>
          {currentBidLabel}
        </Card.Subtitle>
        {auth.user ?
          (<Button
            variant="primary"
            style={{ display: isHovered ? 'block' : 'none' }}
            onClick={(e) => { e.stopPropagation(); onTracking(tracked, id) }}
          >{tracked ? (<HeartFill />) : (<Heart />)}</Button>) : (<></>)}
      </Card.Body>
    </Card>
  );
}