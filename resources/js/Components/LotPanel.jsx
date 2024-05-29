import { router } from '@inertiajs/react';
import { Container, Dropdown, DropdownButton, Image, Row, Col, Accordion, Card } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";

export default function LotPanel({ lot }) {

    function handleDelete() {
        router.delete(`/lots/${lot.id}`);
    }

    return (
        <Container className="mb-5 border" >
            <Row className="align-items-center">
                <Col md={2}>
                    <Image src={lot.path} thumbnail style={{ maxWidth: '100px' }} />
                </Col>
                <Col md={4}>
                    <h5 className="mb-1">{lot.title}</h5>
                    <div className="text-truncate">
                        {/* {lot.description.split(' ').slice(0, 10).join(' ')}... */}
                        {lot.desc}
                    </div>
                </Col>
                <Col md={3}>
                    <div>Створено: {lot.created_at}</div>
                    <div>Дата закриття: {lot.ends_at}</div>
                </Col>
                <Col md={3} className="text-right">
                    <DropdownButton variant="light" title={<ThreeDots />}>
                        <Dropdown.Item href={`/lots/${lot.id}/edit`}>
                            Редагувати
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleDelete}>
                            Видалити
                        </Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Список ставок</Accordion.Header>
                            <Accordion.Body>
                                {lot.bids.map((bid, index) => (
                                    <Card key={index} className="mb-2">
                                        <Card.Body>
                                            <Row>
                                                <Col>
                                                    <strong>Ставка:</strong> {bid.value} грн
                                                </Col>
                                                <Col>
                                                    <strong>Дата:</strong> {bid.set_at}
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
        </Container>
    );
}
