
import Navbar from '@/Components/Navbar';
import { Link, Head } from '@inertiajs/react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { Carousel, Container, Form, Image, ListGroup } from 'react-bootstrap';


export default function LotPage({ auth, categories, lot, photos, bids }) {

    const lastBids = bids.map(el => {
        return (<ListGroup.Item>{'Todo last bids list'}</ListGroup.Item>);
    })

    const carouselItems = photos.map(el => {
        return (
            <Carousel.Item><Image src={URL.createObjectURL(el.photo)}></Image></Carousel.Item>
        );
    })

    return (
        <>
            <Navbar auth={auth} categories={categories}></Navbar>
            <Container>
                <Row>
                    <Col xs={9} md={6}>
                        <Carousel>
                            {carouselItems}
                        </Carousel>
                        <div>
                            //Todo categories 
                        </div>
                        <h3>
                            {lot.title}
                        </h3>
                        <div>
                            {lot.description}
                        </div>
                    </Col>
                    <Col xs={3} md={2}>
                        <div>
                            //Todo timer
                        </div>
                        <ListGroup>
                            {auth.user ? (
                                <ListGroup.Item>
                                    <Form>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Ваша ставка"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" placeholder="1.00₴" />
                                        </FloatingLabel>
                                    </Form>
                                </ListGroup.Item>
                            ) : <></>}
                            {lastBids}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
}