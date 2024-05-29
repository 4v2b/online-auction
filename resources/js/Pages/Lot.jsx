import { Link, Head, usePage, router } from '@inertiajs/react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { Carousel, Container, Form, Image, ListGroup, FloatingLabel, Button, Badge } from 'react-bootstrap';
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

    const lastBids = bids?.map((el, index) => (
        <ListGroup.Item key={index}>
            {el.userName}: <b>{el.value} грн</b> <em>{el.set_at}</em>
        </ListGroup.Item>
    ));

    const carouselItems = photos.map((photo, index) => (
        <Carousel.Item key={index} className="text-center">
            <Image src={photo} fluid style={{ height: 400, objectFit: 'contain' }} />
        </Carousel.Item>
    ));

    const categoryItems = chosenCategories.map((category, index) => (
        <Badge bg="secondary" className="me-2" key={index} as={Link} href={`/categories/${category.id}`} style={{ textDecoration: 'none', color: 'white' }}>
            {category.name}
        </Badge>
    ));

    function handleSubmitBid(event) {
        event.preventDefault();
        const bidAmount = event.target.elements.bid.value;
        router.post(`/bids/create/${lot.id}`, { bid: bidAmount });
    }

    return (
        <MainLayout>
            <Head title={lot.title} />
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <Carousel variant='dark' className='d-flex justify-content-between'>
                            {carouselItems}
                        </Carousel>
                        <div className="mt-3">
                            {categoryItems}
                        </div>
                        <h3 className="mt-3">{lot.title}</h3>
                        <div>{lot.description}</div>
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
                            {auth.user && (
                                <ListGroup.Item>
                                    <div className='mb-1'>Початкова ціна: {lot.start_price} грн</div>
                                    <Form onSubmit={handleSubmitBid}>
                                        <FloatingLabel controlId="floatingInput" label="Ваша ставка" className="mb-3">
                                            <Form.Control type="number" name="bid" step="0.001" />
                                        </FloatingLabel>
                                        <Button type="submit">Підтвердити ставку</Button>
                                    </Form>
                                </ListGroup.Item>
                            )}
                            {lastBids}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
}
