import { Card, Button } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons"

export default function LotCard({ id, title, currentBid, photoBlob, auth }) {
  const [isHovered, setIsHovered] = useState(false);

  const currentBidLabel = 'Поточна ставка: ' + currentBid;

  function addToWishlist() {
    //Todo adding lot to wishlist 
  }

  return (
    <Card
      style={{ width: '18rem' }}
      onClick={() => route(`/lot/${id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Img variant="top" src={URL.createObjectURL(photoBlob)} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>
          {currentBidLabel}
        </Card.Subtitle>
        {auth.user ?
          (<Button
            variant="primary"
            style={{ display: isHovered ? 'block' : 'none' }}
            onClick={addToWishlist}
          ><Heart/></Button>) : (<></>)}
      </Card.Body>
    </Card>
  );
}