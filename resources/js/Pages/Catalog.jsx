import { Container, Row, Col } from 'react-bootstrap';
import LotCard from "@/Components/LotCard";
import MainLayout from "@/Layouts/MainLayout";
import { router } from "@inertiajs/react";
import {Head} from '@inertiajs/react';


export default function Catalog({ lots, message }) {

    function handleTracking(tracked, id) {
        router.post('/lots/track', {
            tracked: tracked,
            id: id
        }, {
            preserveScroll: true
        });
    }

    return (
        <MainLayout>
            <Head title="Каталог" />

            <Container className="py-4">
                <h3>{message}</h3>
                <p>Знайдено лотів: {lots ? lots.length : 0}</p>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {lots?.map(lot => (
                        <Col key={lot.id}>
                            <LotCard
                                id={lot.id}
                                currentBid={lot.currentBid}
                                preview={lot.preview}
                                price={lot.price}
                                title={lot.title}
                                tracked={lot.isTracked}
                                onTracking={handleTracking}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </MainLayout>
    )
}
