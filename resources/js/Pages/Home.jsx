import Navbar from '@/Components/NavBar';
import MainLayout from '@/Layouts/MainLayout';
import { Link, Head, usePage } from '@inertiajs/react';
import { Container, Row, Col, Button, CardDeck, Card } from 'react-bootstrap';

export default function Home({ latestItems, cheapestItems }) {

    const { categories } = usePage().props;

    return (
        <>
            <Head title="Головна" />
            <MainLayout>

                <Container>
                    <Row className="mt-5">
                        <Col>
                            <h1>Заголовок</h1>
                            <p>Бла бла бла</p>
                            <div className="d-flex flex-wrap">
                                <Button href={'/catalog'} className="mr-3 mb-3" variant="primary">
                                    {'Всі лоти'}
                                </Button>
                                {categories.map((category, index) => (
                                    <Button href={`/categories/${category.id}`} key={index} className="mr-3 mb-3" variant="primary">
                                        {category.name}
                                    </Button>
                                ))}
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <h2>Нещодавно додані лоти</h2>
                            <Row className='d-flex flex-row flex-nowrap overflow-auto'>
                                {latestItems?.map((item, index) => (
                                    <Card key={index}>
                                        <Card.Img variant="top" src={item.image} />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>{item.description}</Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">Діє до: {item.endDate}</small>
                                        </Card.Footer>
                                    </Card>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <h2>Лоти від {'{найнижча ціна}'}</h2>
                            <div className="d-flex flex-nowrap overflow-auto">
                                {cheapestItems?.map((item, index) => (
                                    <Card key={index} style={{ width: '18rem' }} className="mr-3">
                                        <Card.Img variant="top" src={item.image} />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>{item.description}</Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">Ціна: ${item.price}</small>
                                        </Card.Footer>
                                    </Card>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>

            </MainLayout>

        </>
    );
}
