import { Link, Head, usePage, router } from '@inertiajs/react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { Carousel, Container, Form, Image, ListGroup, FloatingLabel, Button } from 'react-bootstrap';
import MainLayout from '@/Layouts/MainLayout';
import { useState, useEffect } from 'react';

export default function LotPage({ lot, photos, bids, chosenCategories }) {
    const { auth } = usePage().props;
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const endTime = new Date(lot.ends_at).getTime();
        const now = new Date().getTime();
        const difference = endTime - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        } else {
            timeLeft = { expired: true };
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const lastBids = bids?.map((el, index) => {
        return (<ListGroup.Item key={index}>{el.userName}: {el.value}₴ {el.set_at}</ListGroup.Item>);
    });

    const carouselItems = photos.map((photo, index) => {
        return (
            <Carousel.Item key={index}><Image src={photo} fluid /></Carousel.Item>
        );
    });

    const categoryItems = chosenCategories.map((category, index) => {
        return (
            <Nav.Item key={index}>
                <Nav.Link as={Link} href={`/categories/${category.id}`}>{category.name}</Nav.Link>
            </Nav.Item>
        );
    });

    function handleSubmitBid (event) {
        event.preventDefault();
        const bidAmount = event.target.elements.bid.value;
       // const bidAmount = formData.get('bid');

        router.post(`/bids/create/${lot.id}`, {bid: bidAmount});

       // console.log(`Placing bid: ${bidAmount}₴`);
    };

    return (
        <MainLayout>
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <Carousel>
                            {carouselItems}
                        </Carousel>
                        <Nav className="mt-3">
                            {categoryItems}
                        </Nav>
                        <h3 className="mt-3">
                            {lot.title}
                        </h3>
                        <div>
                            {lot.description}
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        <div className="mt-3">
                            {timeLeft.expired ? (
                                <span>Час аукціону сплив</span>
                            ) : (
                                <span>
                                    Залишилося часу: 
                                    {timeLeft.days !== undefined && `${timeLeft.days} дн `}
                                    {timeLeft.minutes !== undefined && timeLeft.hours === undefined && `${timeLeft.minutes} хв `}
                                    {timeLeft.days === undefined && timeLeft.minutes !== undefined && timeLeft.hours !== undefined && ` ${timeLeft.hours} год ${timeLeft.minutes} хв `}
                                    {timeLeft.seconds !== undefined && timeLeft.minutes !== undefined && timeLeft.hours === undefined && `${timeLeft.minutes}хв ${timeLeft.seconds} сек `}
                                </span>
                            )}
                        </div>
                        <ListGroup className="mt-3">
                            {auth.user ? (
                                <ListGroup.Item>
                                    <Form onSubmit={handleSubmitBid}>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Ваша ставка"
                                            className="mb-3"
                                        >
                                            <Form.Control type="number" name="bid" step="0.001" />
                                        </FloatingLabel>
                                        <Button type="submit">Підтвердити ставку</Button>
                                    </Form>
                                </ListGroup.Item>
                            ) : <></>}
                            {lastBids}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
}
