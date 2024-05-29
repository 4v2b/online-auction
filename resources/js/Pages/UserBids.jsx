import MenuLayout from "@/Layouts/MenuLayout";
import { router } from "@inertiajs/react";
import { Button, Container, Row, Col, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Head } from "@inertiajs/react";

export default function Bids({ bids }) {

    function handleDelete(id) {
        router.delete(`/bids/${id}`, {});
    }

    return (
        <MenuLayout>
            <Head title="Ставки" />
            <Container className="mb-4">
                {bids?.map(bid => (
                    <Card className="mb-3">
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Card.Text className="text-primary"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => router.get(`/catalog/${bid.lot_id}`)}>
                                        {bid.lot_title}
                                    </Card.Text>
                                    <Card.Text>
                                        Діє до: {bid.lot_ends_at}
                                    </Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card.Title>{bid.value} грн</Card.Title>
                                    <Card.Text>
                                        Створено: {bid.set_at}
                                    </Card.Text>
                                    <Card.Text style={{ color: bid.status == 1 ? 'green' : bid.status == -1 ? 'red' : 'black' }}>
                                        {
                                            bid.status == 1 ? 'Переможна ставка'
                                                :
                                                bid.status == -1 ? 'Ставка застаріла' : 'Найвища ставка'
                                        }
                                    </Card.Text>
                                </Col>
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    {bid.status == 0 && (
                                        <Button variant="danger" onClick={() => handleDelete(bid.id)}>
                                            Видалити
                                        </Button>
                                    )}
                                    {bid.status == 1 && (
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    <div>Контакти продавця</div>
                                                    {bid.contacts.map(contact => (
                                                        <div>{contact}</div>
                                                    ))}
                                                </Tooltip>
                                            }
                                        >
                                            <i className="fas fa-info-circle text-success" style={{ cursor: 'pointer', fontSize: '1.5rem' }}></i>
                                        </OverlayTrigger>
                                    )}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </MenuLayout>
    );
}
