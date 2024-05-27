import { Card, Button } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons"
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";

export default function LotCard({ id, title, currentBid, preview, tracked }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tracked1, setTracked1] = useState(tracked);
  const { auth } = usePage().props;

  const currentBidLabel = 'Поточна ставка: ' + currentBid;

  const handleTracking = async (e) => {
    e.preventDefault();
    const isTracked = tracked1 ? 1 : 0;

    try {
      const response = await axios.post(`/lots/${id}/track`, { isTracked }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      setTracked1(response.data.isTracked);
    } catch (error) {
      console.error('Error tracking lot:', error);
      alert('There was an error tracking the lot. Please try again.');
    }
  }

  return (
    <Card
      style={{ width: '18rem' }}
      onClick={() => route('lot', id)}
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
            onClick={handleTracking}
          ><Heart /></Button>) : (<></>)}
      </Card.Body>
    </Card>
  );
}